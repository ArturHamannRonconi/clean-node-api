import { SignInController } from '.'
import { StatusCode } from '../../../protocols/http'
import { MissingParamError, ServerError } from '../../../utils/errors'
import { RequiredFieldsValidator } from '../../../protocols/validators'
import { RequiredFieldsValidatorAdapter } from '../../../../infra/validators/RequiredFieldsValidatorAdapter'
import { AuthenticationRequestDTO, AuthenticationResponseDTO, AuthenticationUseCase } from '../../../../domain/useCases/AuthenticationUseCase'
import { UnautorizedError } from '../../../utils/errors/UnautorizedError'

const makeAuthentication = (): AuthenticationUseCase => {
  class AuthenticationStub implements AuthenticationUseCase {
    async auth (authentication: AuthenticationRequestDTO): Promise<AuthenticationResponseDTO> {
      return await new Promise(resolve => resolve({ accessToken: 'any_token' }))
    }
  }

  return new AuthenticationStub()
}

interface SutTypes {
  sut: SignInController
  requiredFieldsValidator: RequiredFieldsValidator
  authenticationUseCaseStub: AuthenticationUseCase
}

const makeSUT = (): SutTypes => {
  const requiredFieldsValidator = new RequiredFieldsValidatorAdapter([
    'email', 'password'
  ])
  const authenticationUseCaseStub = makeAuthentication()

  const sut = new SignInController(
    requiredFieldsValidator,
    authenticationUseCaseStub
  )

  return {
    sut,
    requiredFieldsValidator,
    authenticationUseCaseStub
  }
}

describe('Sign In Controller', () => {
  it('Should be able to return 400 if email doesn\'t sended', async () => {
    const { sut } = makeSUT()
    const request = {
      password: 'any_password',
      email: undefined
    }

    const httpResponse = await sut.handle(request)
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse.body).toHaveProperty('error',
      new MissingParamError('email').message
    )
  })

  it('Should be able to return 400 if password doesn\'t sended', async () => {
    const { sut } = makeSUT()
    const request = {
      email: 'any_email',
      password: undefined
    }

    const httpResponse = await sut.handle(request)
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.BAD_REQUEST)
    expect(httpResponse.body).toHaveProperty('error',
      new MissingParamError('password').message
    )
  })

  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationUseCaseStub } = makeSUT()
    const authSpy = jest.spyOn(authenticationUseCaseStub, 'auth')

    const request = {
      email: 'any_email',
      password: 'any_password'
    }
    await sut.handle(request)
    expect(authSpy).toHaveBeenCalledWith(request)
  })

  it('Should return token if authentication return token', async () => {
    const { sut, authenticationUseCaseStub } = makeSUT()
    jest.spyOn(authenticationUseCaseStub, 'auth')

    const request = {
      email: 'any_email',
      password: 'any_password'
    }
    const httpResponse = await sut.handle(request)
    expect(httpResponse.body).toHaveProperty('accessToken', 'any_token')
  })

  it('Should return 500 if authentication is failed', async () => {
    const { sut, authenticationUseCaseStub } = makeSUT()
    jest
      .spyOn(authenticationUseCaseStub, 'auth')
      .mockImplementation(() => { throw new Error() })

    const request = {
      email: 'any_email',
      password: 'any_password'
    }

    const httpResponse = await sut.handle(request)
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.INTERNAL_SERVER)
    expect(httpResponse).toHaveProperty('body', new ServerError())
  })

  it('Should return 401 if invalid credentials provided', async () => {
    const { sut, authenticationUseCaseStub } = makeSUT()
    jest
      .spyOn(authenticationUseCaseStub, 'auth')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))

    const request = {
      email: 'any_email',
      password: 'any_password'
    }

    const httpResponse = await sut.handle(request)
    expect(httpResponse)
      .toHaveProperty('statusCode', StatusCode.UNAUTORIZED)
    expect(httpResponse.body)
      .toHaveProperty('error', new UnautorizedError().message)
  })
})
