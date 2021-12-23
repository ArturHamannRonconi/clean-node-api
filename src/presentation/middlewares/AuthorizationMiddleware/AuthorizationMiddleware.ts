import { ConfirmAccessTokenUseCase } from '../../../domain/useCases/ConfirmAccessTokenUseCase'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Middleware } from '../../protocols/Middleware'
import { AccessDeniedError } from '../../utils/errors'
import { forbidden } from '../../utils/http/forbidden'

class AuthorizationMiddleware<T> implements Middleware<T> {
  constructor (
    private readonly confirmAccessTokenUseCase: ConfirmAccessTokenUseCase
  ) {}

  async handle (httpRequest: HttpRequest<T>): Promise<HttpResponse> {
    const { headers } = httpRequest

    if (!headers || !headers.authorization)
      return forbidden(new AccessDeniedError())

    const account = await this.confirmAccessTokenUseCase
      .confirm(headers.authorization)

    if (!account)
      return forbidden(new AccessDeniedError())
  }
}

export { AuthorizationMiddleware }
