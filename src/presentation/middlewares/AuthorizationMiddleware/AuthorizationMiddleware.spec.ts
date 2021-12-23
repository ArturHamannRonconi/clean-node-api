import { StatusCode } from '../../protocols/http'
import { AccessDeniedError } from '../../utils/errors'
import { AuthorizationMiddleware } from './AuthorizationMiddleware'
import { HttpRequest } from '../../protocols/http/HttpAnnouncements'
import { ConfirmAccessTokenRequestDTO, ConfirmAccessTokenResponseDTO, ConfirmAccessTokenUseCase } from '../../../domain/useCases/ConfirmAccessTokenUseCase'
import { Role } from '../../../domain/protocols/Role'

const makeFakeConfirmAccessTokenUseCase = (): ConfirmAccessTokenUseCase => {
  class ConfirmAccessTokenUseCaseStub implements ConfirmAccessTokenUseCase {
    async confirm (confirmationData: ConfirmAccessTokenRequestDTO): Promise<ConfirmAccessTokenResponseDTO> {
      return await new Promise(
        resolve => resolve({ accountId: 'any_id' })
      )
    }
  }

  return new ConfirmAccessTokenUseCaseStub()
}

const makeFakeHttpRequest = (): HttpRequest<any> => ({
  headers: { authorization: 'any_token' },
  body: {}
})

interface SutTypes {
  sut: AuthorizationMiddleware<any>
  confirmAccessTokenUseCase: ConfirmAccessTokenUseCase
}

const makeSUT = (role: Role): SutTypes => {
  const confirmAccessTokenUseCase = makeFakeConfirmAccessTokenUseCase()
  const sut = new AuthorizationMiddleware(
    confirmAccessTokenUseCase,
    role
  )

  return {
    sut,
    confirmAccessTokenUseCase
  }
}

describe('Authorization Middleware', () => {
  it('Should return 403 if no x-access-token exists', async () => {
    const role = Role.ADMIN
    const { sut } = makeSUT(role)

    const httpResponse = await sut.handle({})
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.FORBIDDEN)
    expect(httpResponse).toHaveProperty('body', new AccessDeniedError())
  })

  it('Should to able to call confirmAccessTokenUseCase', async () => {
    const role = Role.ADMIN
    const { sut, confirmAccessTokenUseCase } = makeSUT(role)
    const confirmSpy = jest.spyOn(confirmAccessTokenUseCase, 'confirm')
    const httpRequest = makeFakeHttpRequest()

    await sut.handle(httpRequest)
    expect(confirmSpy).toHaveBeenCalledWith({
      authorization: httpRequest.headers.authorization,
      role
    })
  })

  it('Should return 403 if confirmAccessTokenUseCase returns null', async () => {
    const role = Role.ADMIN
    const { sut, confirmAccessTokenUseCase } = makeSUT(role)
    jest
      .spyOn(confirmAccessTokenUseCase, 'confirm')
      .mockReturnValueOnce(
        new Promise(resolve => resolve(null))
      )

    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.FORBIDDEN)
    expect(httpResponse).toHaveProperty('body', new AccessDeniedError())
  })

  it('Should return 500 if confirmAccessTokenUseCase throws', async () => {
    const role = Role.ADMIN
    const { sut, confirmAccessTokenUseCase } = makeSUT(role)
    jest
      .spyOn(confirmAccessTokenUseCase, 'confirm')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

    const error = sut.handle(makeFakeHttpRequest())
    await expect(error).rejects.toThrow()
  })

  it('Should return 200 of confirmAccessTokenUseCase returns an account id', async () => {
    const role = Role.ADMIN
    const { sut } = makeSUT(role)

    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse.body).toHaveProperty('accountId', 'any_id')
  })
})
