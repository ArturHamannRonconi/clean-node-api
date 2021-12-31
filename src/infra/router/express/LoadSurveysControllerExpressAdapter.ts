import { Request, Response } from 'express'
import { loadSurveysControllerFactory } from '../../../main/factories/controllers/LoadSurveysControllerFactory'
import { RouterAdapter } from '../RouterAdapter'

class LoadSurveysConrollerExpressAdapter {
  static async handle (request: Request, response: Response): Promise<Response> {
    return await RouterAdapter.getExpressResponse<void>(
      null,
      response,
      loadSurveysControllerFactory
    )
  }
}

export { LoadSurveysConrollerExpressAdapter }
