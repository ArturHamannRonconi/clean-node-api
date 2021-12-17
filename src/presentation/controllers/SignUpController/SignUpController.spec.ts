import { SignUpController } from '.'
import { EmailValidator, StatusCode } from '../../protocols'
import { AccountAlreadyExistsError, InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { AddAccountUseCase, AddAccountRequestDTO, AddAccountResponseDTO } from '../../../domain/useCases/AddAccountUseCase'
import { RequiredFieldsValidatorAdapter } from '../../utils/RequiredFieldsValidatorAdapter/RequiredFieldsValidatorAdapter'
import { VerifyAccountExistsRequestDTO, VerifyAccountExistsUseCase } from '../../../domain/useCases/VerifyAccountExistsUseCase'

const makeVerifyAccountExistsUseCase = (): VerifyAccountExistsUseCase => {
  class VerifyAccountExistsStub implements VerifyAccountExistsUseCase {
    async verify (account: VerifyAccountExistsRequestDTO): Promise<boolean> {
      return await new Promise(resolve => resolve(false))
    }
  }

  return new VerifyAccountExistsStub()
}

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
  verifyAccountExists: VerifyAccountExistsUseCase
}

const makeSUT = (): SutTypes => {
  const addAccount = makeAddAccount()
  const emailValidator = makeEmailValidator()
  const verifyAccountExists = makeVerifyAccountExistsUseCase()

  const sut = new SignUpController(
    addAccount,
    emailValidator,
    new RequiredFieldsValidatorAdapter([
      'email', 'name', 'password',
      'passwordConfirmation'
    ]),
    verifyAccountExists
  )

  return {
    emailValidator,
    sut,
    addAccount,
    verifyAccountExists
  }
}

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', async () => {
    const { sut } = makeSUT()
    const httpRequest = {
      body: {
        name: undefined,
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('name'))
  })

  it('Should return 400 if no email is provided', async () => {
    const { sut } = makeSUT()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: undefined,
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('email'))
  })

  it('Should return 400 if no password is provided', async () => {
    const { sut } = makeSUT()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: undefined,
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('password'))
  })

  it('Should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSUT()
    const httpRequest = {
      body: {
        passwordConfirmation: undefined,
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('passwordConfirmation'))
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

  it('Should return 201 if valid data is provided', async () => {
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

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.CREATED)
    expect(httpResponse).toHaveProperty('body', {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com'
    })
  })

  it('Should be able to return 409 if account already exists', async () => {
    const { sut, verifyAccountExists } = makeSUT()
    jest.spyOn(verifyAccountExists, 'verify')
      .mockReturnValueOnce(new Promise(resolve => resolve(true)))

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'email_already_exists',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.CONFLICT)
    expect(httpResponse).toHaveProperty('body', new AccountAlreadyExistsError())
  })
})
