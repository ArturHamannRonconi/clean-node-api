import { Request, Response, NextFunction } from 'express'
import { StatusCode } from '../../../presentation/protocols/http'
import { Middleware } from '../../../presentation/protocols/Middleware'

abstract class ExpressMiddlewareAdapter {
  static async transformToExpressMiddlewareRequest (
    request: Request,
    response: Response,
    next: NextFunction,
    factory: () => Middleware
  ): Promise<Response | void> {
    const httpRequest = {
      body: request.body,
      headers: request.headers
    }

    const resultResponse = await factory().handle(httpRequest)

    if (resultResponse.statusCode !== StatusCode.SUCCESS)
      return response
        .status(resultResponse?.statusCode || 500)
        .json(resultResponse?.body || {})

    Object.assign(request.body, resultResponse.body)
    return next()
  }
}

export { ExpressMiddlewareAdapter }
