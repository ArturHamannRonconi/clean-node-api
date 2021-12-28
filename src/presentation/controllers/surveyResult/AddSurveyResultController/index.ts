import { LoadSurveyByIdUseCase } from '../../../../domain/useCases/LoadSurveyByIdUseCase'
import { Controller } from '../../../protocols'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { AccessDeniedError } from '../../../utils/errors'
import { forbidden } from '../../../utils/http/forbidden'
import { AddSurveyResultHttpRequestBody } from './AddSurveyResultHttpRequestBody'

class AddSurveyResultController implements Controller<AddSurveyResultHttpRequestBody> {
  constructor (
    private readonly loadSurveyByIdUseCase: LoadSurveyByIdUseCase
  ) {}

  async handle (httpRequest: HttpRequest<AddSurveyResultHttpRequestBody>): Promise<HttpResponse> {
    const { survey_id: surveyId } = httpRequest.params
    const surveyExists = await this.loadSurveyByIdUseCase.load({ surveyId })

    if (!surveyExists)
      return forbidden(new AccessDeniedError())

    return null
  }
}

export { AddSurveyResultController }
