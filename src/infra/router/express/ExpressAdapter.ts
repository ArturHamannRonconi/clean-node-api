import { Request, Response } from 'express'
import { Controller } from '../../../presentation/protocols'

abstract class ExpressAdapter {
  static async transformToExpressRequest<T>(request: Request, response: Response, factory: () => Controller<T>): Promise<Response> {
    const httpRequest = {
      body: request.body,
      headers: request.headers
    }

    const resultResponse = await factory().handle(httpRequest)

    if (resultResponse.headers && resultResponse?.headers.length > 0)
      resultResponse.headers.forEach(
        ({ headerName, value }) => response.setHeader(headerName, value)
      )

    return response
      .status(resultResponse?.statusCode || 200)
      .json(resultResponse?.body || {})
  }
}

export { ExpressAdapter }
