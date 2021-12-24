import { success } from '../../utils/http'
import { forbidden } from '../../utils/http/forbidden'
import { AccessDeniedError } from '../../utils/errors'
import { Middleware } from '../../protocols/Middleware'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { ConfirmAccessTokenUseCase } from '../../../domain/useCases/ConfirmAccessTokenUseCase'

class AuthorizationMiddleware implements Middleware {
  constructor (
    private readonly confirmAccessTokenUseCase: ConfirmAccessTokenUseCase
  ) {}

  async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse> {
    const { headers } = httpRequest

    if (!headers || !headers.authorization)
      return forbidden(new AccessDeniedError())

    const confirmation = await this.confirmAccessTokenUseCase
      .confirm({ authorization: headers.authorization })

    if (!confirmation?.accountId)
      return forbidden(new AccessDeniedError())

    return success(confirmation)
  }
}

export { AuthorizationMiddleware }
