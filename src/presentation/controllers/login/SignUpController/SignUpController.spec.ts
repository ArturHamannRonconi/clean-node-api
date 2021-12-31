import { SignUpController } from '.'
import { StatusCode } from '../../../protocols/http'
import { EmailValidator, Validation } from '../../../protocols/validators'
import { AccountAlreadyExistsError, MissingParamError, ServerError } from '../../../utils/errors'
import { AddAccountUseCase, AddAccountRequestDTO, AddAccountResponseDTO } from '../../../../domain/useCases/AddAccountUseCase'
import { VerifyAccountExistsRequestDTO, VerifyAccountExistsUseCase } from '../../../../domain/useCases/VerifyAccountExistsUseCase'
import { Role } from '../../../../domain/protocols/Role'

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
    async validate (input: any): Promise<Error> {
      return await new Promise(resolve => resolve(this.isValid(input)))
    }

    isValid (email: string): Error {
      return null
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

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    constructor (
      private readonly validations: Validation[]
    ) { }

    async validate (input: any): Promise<Error> {
      return await new Promise(resolve => resolve(null))
    }
  }
  const emailValidator = makeEmailValidator()

  return new ValidationStub([
    emailValidator
  ])
}

interface SutTypes {
  sut: SignUpController
  addAccount: AddAccountUseCase
  verifyAccountExists: VerifyAccountExistsUseCase
  validationStub: Validation
}

const makeSUT = (): SutTypes => {
  const addAccount = makeAddAccount()
  const verifyAccountExists = makeVerifyAccountExistsUseCase()
  const validationStub = makeValidationStub()

  const sut = new SignUpController(
    addAccount,
    verifyAccountExists,
    validationStub
  )

  return {
    sut,
    addAccount,
    verifyAccountExists,
    validationStub
  }
}

describe('SignUp Controller', () => {
  it('Should call AddAccount with correct values', async () => {
    const { sut, addAccount } = makeSUT()
    const addAccountSpy = jest.spyOn(addAccount, 'add')

    const request = {
      email: 'any_email@mail.com',
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }

    await sut.handle(request)
    expect(addAccountSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      name: 'any_name',
      password: 'any_password',
      role: Role.NORMAL
    })
  })

  it('Should return 500 if AddAccount throws is provided', async () => {
    const { sut, addAccount } = makeSUT()
    jest.spyOn(addAccount, 'add')
      .mockImplementation(async () =>
        await new Promise((resolve, reject) => reject(new Error()))
      )

    const request = {
      email: 'any_email@mail.com',
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
    const httpResponse = await sut.handle(request)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.INTERNAL_SERVER)
    expect(httpResponse).toHaveProperty('body', new ServerError())
  })

  it('Should return 201 if valid data is provided', async () => {
    const { sut } = makeSUT()

    const request = {
      email: 'any_email@mail.com',
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
    const httpResponse = await sut.handle(request)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.CREATED)
  })

  it('Should be able to return 409 if account already exists', async () => {
    const { sut, verifyAccountExists } = makeSUT()
    jest.spyOn(verifyAccountExists, 'verify')
      .mockReturnValueOnce(new Promise(resolve => resolve(true)))

    const request = {
      name: 'any_name',
      email: 'email_already_exists',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.CONFLICT)
    expect(httpResponse.body).toHaveProperty('error',
      new AccountAlreadyExistsError().message
    )
  })

  it('Should call validation with correct value', async () => {
    const { sut, validationStub } = makeSUT()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const request = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }

    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request)
  })

  it('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSUT()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new Promise(
        resolve => resolve(new MissingParamError('email'))
      ))

    const request = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }

    const httpResponse = await sut.handle(request)
    expect(httpResponse.body).toHaveProperty('error',
      new MissingParamError('email').message
    )
  })
})
