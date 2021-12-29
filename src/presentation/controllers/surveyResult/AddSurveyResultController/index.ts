import { LoadSurveyByIdUseCase } from '../../../../domain/useCases/LoadSurveyByIdUseCase'
import { Controller } from '../../../protocols'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { InvalidParamError } from '../../../utils/errors'
import { serverError } from '../../../utils/http'
import { forbidden } from '../../../utils/http/forbidden'
import { AddSurveyResultHttpRequestBody } from './AddSurveyResultHttpRequestBody'

class AddSurveyResultController implements Controller<AddSurveyResultHttpRequestBody> {
  constructor (
    private readonly loadSurveyByIdUseCase: LoadSurveyByIdUseCase
  ) {}

  async handle (httpRequest: HttpRequest<AddSurveyResultHttpRequestBody>): Promise<HttpResponse> {
    try {
      const { survey_id: surveyId } = httpRequest.params
      const { answer, accountId } = httpRequest.body

      const surveyExists = await this.loadSurveyByIdUseCase.load({ surveyId })

      if (!surveyExists)
        return forbidden(new InvalidParamError('survey_id'))

      const answerExists = surveyExists
        .survey.answers.find(a => a.answer === answer)

      if (!answerExists)
        return forbidden(new InvalidParamError('answer'))

      return null
    } catch (error) {
      return serverError(error.message)
    }
  }
}

export { AddSurveyResultController }
