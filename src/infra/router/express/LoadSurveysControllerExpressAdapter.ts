import { Request, Response } from 'express'
import { loadSurveysControllerFactory } from '../../../main/factories/controllers/LoadSurveysControllerFactory'
import { ExpressAdapter } from './ExpressAdapter'

class LoadSurveysConrollerExpressAdapter {
  static async handle (request: Request, response: Response): Promise<Response> {
    return await ExpressAdapter.transformToExpressRequest<void>(
      request,
      response,
      loadSurveysControllerFactory
    )
  }
}

export { LoadSurveysConrollerExpressAdapter }
