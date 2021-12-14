import MissingParamError from '../errors/MissingParamError'
import SignUpController from './SignUpController'

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', 400)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('Missing param: name'))
  })

  it('Should return 400 if no email is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', 400)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('Missing param: email'))
  })
})
