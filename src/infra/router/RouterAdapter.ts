import { Response } from 'express'
import { Controller } from '../../presentation/protocols'

abstract class RouterAdapter {
  static async getExpressResponse<T>(request: T, response: Response, factory: () => Controller<T>): Promise<Response> {
    const resultResponse = await factory().handle(request)

    if (resultResponse.headers && resultResponse?.headers.length > 0)
      resultResponse.headers.forEach(
        ({ name, value }) => response.setHeader(name, value)
      )

    return response
      .status(resultResponse?.statusCode || 200)
      .json(resultResponse?.body || {})
  }
}

export { RouterAdapter }
