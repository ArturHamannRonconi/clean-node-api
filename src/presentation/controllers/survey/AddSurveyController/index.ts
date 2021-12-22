import { AddSurveyUseCase } from '../../../../domain/useCases/AddSurveyUseCase'
import { Controller } from '../../../protocols'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validators'
import { badRequest, serverError } from '../../../utils/http'
import { AddSurveyHttpRequestBody } from './AddSurveyHttpRequestBody'

class AddSurveyController implements Controller<AddSurveyHttpRequestBody> {
  constructor (
    private readonly validation: Validation,
    private readonly addSurveyUseCase: AddSurveyUseCase
  ) {}

  async handle (httpRequest: HttpRequest<AddSurveyHttpRequestBody>): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      await this.addSurveyUseCase.add(httpRequest.body)

      return null
    } catch (error) {
      return serverError(error.message)
    }
  }
}

export { AddSurveyController }
