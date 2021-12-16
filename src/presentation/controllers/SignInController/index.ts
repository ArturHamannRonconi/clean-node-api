import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

class SignInController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const fields = ['email', 'password']

    for (const field of fields) {
      if (!httpRequest.body[field]) return badRequest(
        new MissingParamError(field)
      )
    }
  }
}

export { SignInController }
