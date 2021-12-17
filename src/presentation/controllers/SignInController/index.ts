import { badRequest } from '../../helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { RequiredFieldsValidator } from '../../protocols/RequiredFieldsValidator'
import { SignInHttpRequestBody } from './SignInHttpRequestBody'

class SignInController implements Controller<SignInHttpRequestBody> {
  constructor (
    private readonly requiredFieldsValidator: RequiredFieldsValidator
  ) { }

  async handle (httpRequest: HttpRequest<SignInHttpRequestBody>): Promise<HttpResponse> {
    const absenceFields = await this
      .requiredFieldsValidator
      .validate(httpRequest)

    if (absenceFields)
      return badRequest(absenceFields)
  }
}

export { SignInController }
