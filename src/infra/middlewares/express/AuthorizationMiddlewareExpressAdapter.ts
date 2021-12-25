import { Request, Response, NextFunction } from 'express'
import { AuthorizationMiddlewareFactory } from '../../../main/factories/middlewares/AuthorizationMiddlewareFactory'
import { ExpressMiddlewareAdapter } from './ExpressMiddlewareAdapter'

class AuthorizationMiddlewareExpressAdapter {
  static async handle (request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    return await ExpressMiddlewareAdapter.transformToExpressMiddlewareRequest(
      request,
      response,
      next,
      AuthorizationMiddlewareFactory
    )
  }
}

export { AuthorizationMiddlewareExpressAdapter }
