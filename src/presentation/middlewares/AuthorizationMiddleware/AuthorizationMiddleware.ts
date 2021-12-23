import { success } from '../../utils/http'
import { forbidden } from '../../utils/http/forbidden'
import { AccessDeniedError } from '../../utils/errors'
import { Middleware } from '../../protocols/Middleware'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { ConfirmAccessTokenUseCase } from '../../../domain/useCases/ConfirmAccessTokenUseCase'

class AuthorizationMiddleware<T> implements Middleware<T> {
  constructor (
    private readonly confirmAccessTokenUseCase: ConfirmAccessTokenUseCase
  ) {}

  async handle (httpRequest: HttpRequest<T>): Promise<HttpResponse> {
    const { headers } = httpRequest

    if (!headers || !headers.authorization)
      return forbidden(new AccessDeniedError())

    const accountId = await this.confirmAccessTokenUseCase
      .confirm({ authorization: headers.authorization })

    if (!accountId)
      return forbidden(new AccessDeniedError())

    return success(accountId)
  }
}

export { AuthorizationMiddleware }
