import { badRequest } from '../../helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { RequiredFieldsValidator } from '../../protocols/RequiredFieldsValidator'

interface HttpRequestBody {
  readonly email: string
  readonly password: string
}

class SignInController implements Controller {
  constructor (
    private readonly RequiredFieldsValidator: RequiredFieldsValidator
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    httpRequest.body as unknown as HttpRequestBody

    const absenceFields = await this
      .RequiredFieldsValidator
      .validate(httpRequest)

    if (absenceFields)
      return badRequest(absenceFields)
  }
}

export { SignInController }
