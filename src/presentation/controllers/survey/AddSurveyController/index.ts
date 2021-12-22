import { Controller } from '../../../protocols'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validators'
import { AddSurveyHttpRequestBody } from './AddSurveyHttpRequestBody'

class AddSurveyController implements Controller<AddSurveyHttpRequestBody> {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest<AddSurveyHttpRequestBody>): Promise<HttpResponse> {
    await this.validation.validate(httpRequest.body)
    return null
  }
}

export { AddSurveyController }
