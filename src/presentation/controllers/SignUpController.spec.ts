import MissingParamError from '../errors/MissingParamError'
import SignUpController from './SignUpController'

const makeSUT = (): SignUpController => new SignUpController()

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', () => {
    const sut = makeSUT()
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
    const sut = makeSUT()
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

  it('Should return 400 if no password is provided', () => {
    const sut = makeSUT()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', 400)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('Missing param: password'))
  })

  it('Should return 400 if no passwordConfirmation is provided', () => {
    const sut = makeSUT()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse).toHaveProperty('statusCode', 400)
    expect(httpResponse).toHaveProperty('body', new MissingParamError('Missing param: passwordConfirmation'))
  })
})
