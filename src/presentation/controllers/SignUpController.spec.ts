import { SignUpController } from './SignUpController'
import { EmailValidator, StatusCode } from '../protocols'
import { InvalidParamError, MissingParamError, ServerError } from '../errors'
import { AddAccountUseCase, AddAccountRequestDTO, AddAccountResponseDTO } from '../../domain/useCases'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}
const makeAddAccount = (): AddAccountUseCase => {
  class AddAccountStubUseCase implements AddAccountUseCase {
    async add (account: AddAccountRequestDTO): Promise<AddAccountResponseDTO> {
      return await new Promise(resolve => resolve({
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com'
      }))
    }
  }

  return new AddAccountStubUseCase()
}

interface SutTypes {
  emailValidator: EmailValidator
  sut: SignUpController
  addAccount: AddAccountUseCase
}

const makeSUT = (): SutTypes => {
  const addAccount = makeAddAccount()
  const emailValidator = makeEmailValidator()
  const sut = new SignUpController(
    addAccount,
    emailValidator
  )

  return {
    emailValidator,
    sut,
    addAccount
  }
}

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', async () => {
    const { sut } = makeSUT()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('Missing param: name'))
  })

  it('Should return 400 if no email is provided', async () => {
    const { sut } = makeSUT()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('Missing param: email'))
  })

  it('Should return 400 if no password is provided', async () => {
    const { sut } = makeSUT()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('Missing param: password'))
  })

  it('Should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSUT()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('Missing param: passwordConfirmation'))
  })

  it('Should return 400 if and invalid email is provided', async () => {
    const { sut, emailValidator } = makeSUT()
    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        email: 'any_email.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', new InvalidParamError('email'))
  })

  it('Should call EmailValidator with correct Email', async () => {
    const { sut, emailValidator } = makeSUT()
    const emailIsValidSpy = jest.spyOn(emailValidator, 'isValid')

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)

    expect(emailIsValidSpy)
      .toHaveBeenCalledWith(httpRequest.body.email)
  })

  it('Should return 500 if email validator throws is provided', async () => {
    const { sut, emailValidator } = makeSUT()
    jest.spyOn(emailValidator, 'isValid')
      .mockImplementation(() => { throw new Error() })

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.INTERNAL_SERVER)
    expect(httpResponse).toHaveProperty('body', new ServerError())
  })

  it('Should return 400 if password and passwordConfirmation are different provided', async () => {
    const { sut, emailValidator } = makeSUT()
    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password_2'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', new InvalidParamError('passwordConfirmation'))
  })

  it('Should call AddAccount with correct values', async () => {
    const { sut, addAccount } = makeSUT()
    const addAccountSpy = jest.spyOn(addAccount, 'add')

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)
    expect(addAccountSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      name: 'any_name',
      password: 'any_password'
    })
  })

  it('Should return 500 if AddAccount throws is provided', async () => {
    const { sut, addAccount } = makeSUT()
    jest.spyOn(addAccount, 'add')
      .mockImplementation(async () =>
        await new Promise((resolve, reject) => reject(new Error()))
      )

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.INTERNAL_SERVER)
    expect(httpResponse).toHaveProperty('body', new ServerError())
  })

  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSUT()

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.SUCCESS)
    expect(httpResponse).toHaveProperty('body', {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com'
    })
  })
})
