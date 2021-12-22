import { Controller } from '../../../protocols'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validators'
import { badRequest } from '../../../utils/http'
import { AddSurveyHttpRequestBody } from './AddSurveyHttpRequestBody'

class AddSurveyController implements Controller<AddSurveyHttpRequestBody> {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest<AddSurveyHttpRequestBody>): Promise<HttpResponse> {
    const error = await this
      .validation.validate(httpRequest.body)
    if (error) return badRequest(error)

    return null
  }
}

export { AddSurveyController }
