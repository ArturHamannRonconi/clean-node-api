import { Role } from '../../../domain/protocols/Role'
import { ConfirmAccessTokenUseCase } from '../../../domain/useCases/ConfirmAccessTokenUseCase'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Middleware } from '../../protocols/Middleware'
import { AccessDeniedError } from '../../utils/errors'
import { success } from '../../utils/http'
import { forbidden } from '../../utils/http/forbidden'

class AuthorizationMiddleware<T> implements Middleware<T> {
  constructor (
    private readonly confirmAccessTokenUseCase: ConfirmAccessTokenUseCase,
    private readonly role: Role
  ) {}

  async handle (httpRequest: HttpRequest<T>): Promise<HttpResponse> {
    const { headers } = httpRequest

    if (!headers || !headers.authorization)
      return forbidden(new AccessDeniedError())

    const accountId = await this.confirmAccessTokenUseCase
      .confirm({ authorization: headers.authorization, role: this.role })

    if (!accountId)
      return forbidden(new AccessDeniedError())

    return success(accountId)
  }
}

export { AuthorizationMiddleware }
