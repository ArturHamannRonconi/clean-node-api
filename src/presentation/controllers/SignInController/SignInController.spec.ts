import { SignInController } from '.'
import { MissingParamError } from '../../errors'
import { StatusCode } from '../../protocols'
import { RequiredFieldsValidatorAdapter } from '../../utils/RequiredFieldsValidatorAdapter/RequiredFieldsValidatorAdapter'

const makeSUT = (): SignInController => {
  return new SignInController(
    new RequiredFieldsValidatorAdapter([
      'email', 'password'
    ])
  )
}

describe('Sign In Controller', () => {
  it('Should be able to return 400 if email doesn\'t sended', async () => {
    const sut = makeSUT()
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
    const sut = makeSUT()
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
