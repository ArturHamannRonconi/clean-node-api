import { AccessDeniedError } from '../../utils/errors'
import { StatusCode } from '../../protocols/http'
import { AuthorizationMiddleware } from './AuthorizationMiddleware'

interface SutTypes {
  sut: AuthorizationMiddleware<any>
}

const makeSUT = (): SutTypes => {
  const sut = new AuthorizationMiddleware()

  return {
    sut
  }
}

describe('Authorization Middleware', () => {
  it('Should return 403 if no x-access-token exists', async () => {
    const { sut } = makeSUT()

    const httpResponse = await sut.handle({})
    expect(httpResponse).toHaveProperty('statusCode', StatusCode.FORBIDDEN)
    expect(httpResponse).toHaveProperty('body', new AccessDeniedError())
  })
})
