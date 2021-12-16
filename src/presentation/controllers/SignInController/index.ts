import { badRequest } from '../../helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { RequiredFieldsValidator } from '../../protocols/RequiredFieldsValidator'

class SignInController implements Controller {
  constructor (
    private readonly RequiredFieldsValidator: RequiredFieldsValidator
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = await this
      .RequiredFieldsValidator
      .validate(httpRequest)

    if (error) return badRequest(error)
  }
}

export { SignInController }
