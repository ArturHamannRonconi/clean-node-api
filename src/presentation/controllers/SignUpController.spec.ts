import { SignUpController } from './SignUpController'
import { EmailValidator, StatusCode } from '../protocols'
import { InvalidParamError, MissingParamError, ServerError } from '../errors'

interface SutTypes {
  emailValidator: EmailValidator
  sut: SignUpController
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeSUT = (): SutTypes => {
  const emailValidator = makeEmailValidator()
  const sut = new SignUpController(emailValidator)

  return {
    emailValidator,
    sut
  }
}

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', () => {
    const { sut } = makeSUT()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('Missing param: name'))
  })

  it('Should return 400 if no email is provided', () => {
    const { sut } = makeSUT()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('Missing param: email'))
  })

  it('Should return 400 if no password is provided', () => {
    const { sut } = makeSUT()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('Missing param: password'))
  })

  it('Should return 400 if no passwordConfirmation is provided', () => {
    const { sut } = makeSUT()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('Missing param: passwordConfirmation'))
  })

  it('Should return 400 if and invalid email is provided', () => {
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
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', new InvalidParamError('email'))
  })

  it('Should call EmailValidator with correct Email', () => {
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
    sut.handle(httpRequest)

    expect(emailIsValidSpy)
      .toHaveBeenCalledWith(httpRequest.body.email)
  })
  it('Should return 500 if email validator throws is provided', () => {
    const emailValidator = makeEmailValidator()
    emailValidator.isValid = () => { throw new Error() }

    const sut = new SignUpController(emailValidator)

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', StatusCode.INTERNAL_SERVER)
    expect(httpResponse).toHaveProperty('body', new ServerError())
  })
})
