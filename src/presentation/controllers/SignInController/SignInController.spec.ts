import { SignInController } from '.'
import { StatusCode } from '../../protocols'
import { MissingParamError } from '../../errors'
import { RequiredFieldsValidator } from '../../protocols/RequiredFieldsValidator'
import { RequiredFieldsValidatorAdapter } from '../../utils/RequiredFieldsValidatorAdapter/RequiredFieldsValidatorAdapter'

interface SutTypes {
  sut: SignInController
  requiredFieldsValidator: RequiredFieldsValidator
}

const makeSUT = (): SutTypes => {
  const requiredFieldsValidator = new RequiredFieldsValidatorAdapter([
    'email', 'password'
  ])
  const sut = new SignInController(requiredFieldsValidator)

  return {
    sut,
    requiredFieldsValidator
  }
}

describe('Sign In Controller', () => {
  it('Should be able to return 400 if email doesn\'t sended', async () => {
    const { sut } = makeSUT()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('email'))
  })

  it('Should be able to return 400 if password doesn\'t sended', async () => {
    const { sut } = makeSUT()
    const httpRequest = {
      body: {
        email: 'any_email'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('password'))
  })
})
