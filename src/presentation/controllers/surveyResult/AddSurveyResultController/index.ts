import { Controller } from '../../../protocols'
import { created, serverError } from '../../../utils/http'
import { forbidden } from '../../../utils/http/forbidden'
import { InvalidParamError } from '../../../utils/errors'
import { HttpResponse } from '../../../protocols/http'
import { AddSurveyResultRequest } from './AddSurveyResultRequest'
import { LoadSurveyByIdUseCase } from '../../../../domain/useCases/LoadSurveyByIdUseCase'
import { SaveSurveyResultUseCase } from '../../../../domain/useCases/SaveSurveyResultUseCase'

class AddSurveyResultController implements Controller<AddSurveyResultRequest> {
  constructor (
    private readonly loadSurveyByIdUseCase: LoadSurveyByIdUseCase,
    private readonly saveSurveyResultUseCase: SaveSurveyResultUseCase
  ) {}

  async handle (request: AddSurveyResultRequest): Promise<HttpResponse> {
    try {
      const { surveyId, answer, accountId } = request
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
