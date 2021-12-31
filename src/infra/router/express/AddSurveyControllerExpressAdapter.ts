import { Request, Response } from 'express'
import { addSurveyControllerFactory } from '../../../main/factories/controllers/AddSurveyControllerFactory'
import { AddSurveyRequest } from '../../../presentation/controllers/survey/AddSurveyController/AddSurveyRequest'
import { RouterAdapter } from '../RouterAdapter'

class AddSurveyControllerExpressAdapter {
  static async handle (request: Request, response: Response): Promise<Response> {
    const { accountId, role, question, answers } = request.body

    return await RouterAdapter.getExpressResponse<AddSurveyRequest>(
      { accountId, role, question, answers },
      response,
      addSurveyControllerFactory
    )
  }
}

export { AddSurveyControllerExpressAdapter }
