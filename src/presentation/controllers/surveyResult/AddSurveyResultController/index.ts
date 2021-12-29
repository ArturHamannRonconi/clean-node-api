import { Controller } from '../../../protocols'
import { created, serverError } from '../../../utils/http'
import { forbidden } from '../../../utils/http/forbidden'
import { InvalidParamError } from '../../../utils/errors'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { AddSurveyResultHttpRequestBody } from './AddSurveyResultHttpRequestBody'
import { LoadSurveyByIdUseCase } from '../../../../domain/useCases/LoadSurveyByIdUseCase'
import { SaveSurveyResultUseCase } from '../../../../domain/useCases/SaveSurveyResultUseCase'

class AddSurveyResultController implements Controller<AddSurveyResultHttpRequestBody> {
  constructor (
    private readonly loadSurveyByIdUseCase: LoadSurveyByIdUseCase,
    private readonly saveSurveyResultUseCase: SaveSurveyResultUseCase
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

      await this.saveSurveyResultUseCase.save(
        { accountId, answer, surveyId }
      )

      return created()
    } catch (error) {
      return serverError(error.message)
    }
  }
}

export { AddSurveyResultController }
