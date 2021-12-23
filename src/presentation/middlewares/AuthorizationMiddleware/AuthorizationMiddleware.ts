import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Middleware } from '../../protocols/Middleware'
import { AccessDeniedError } from '../../utils/errors'
import { forbidden } from '../../utils/http/forbidden'

class AuthorizationMiddleware<T> implements Middleware<T> {
  async handle (httpRequest: HttpRequest<T>): Promise<HttpResponse> {
    const { headers } = httpRequest

    if (!headers || !headers.authorization)
      return forbidden(new AccessDeniedError())
  }
}

export { AuthorizationMiddleware }
