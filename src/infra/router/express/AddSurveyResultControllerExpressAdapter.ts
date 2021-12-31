import { Request, Response } from 'express'
import { addSurveyResultControllerFactory } from '../../../main/factories/controllers/AddSurveyResultControllerFactory'
import { AddSurveyResultRequest } from '../../../presentation/controllers/surveyResult/AddSurveyResultController/AddSurveyResultRequest'
import { RouterAdapter } from '../RouterAdapter'

class AddSurveyResultControllerExpressAdapter {
  static async handle (request: Request, response: Response): Promise<Response> {
    const { accountId, answer } = request.body
    const { survey_id: surveyId } = request.params

    return await RouterAdapter.getExpressResponse<AddSurveyResultRequest>(
      { accountId, answer, surveyId },
      response,
      addSurveyResultControllerFactory
    )
  }
}

export { AddSurveyResultControllerExpressAdapter }
