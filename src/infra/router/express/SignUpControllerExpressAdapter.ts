import { Request, Response } from 'express'
import { signUpFactory } from '../../../main/factories/signUpFactory'

class SignUpControllerExpressdapter {
  static async handle (request: Request, response: Response): Promise<Response> {
    const httpRequest = {
      body: request.body,
      headers: request.headers
    }
    const resultResponse = await signUpFactory().handle(httpRequest)

    if (resultResponse.headers && resultResponse?.headers.length > 0)
      resultResponse.headers.forEach(
        ({ headerName, value }) => response.setHeader(headerName, value)
      )

    return response
      .status(resultResponse?.statusCode || 200)
      .json(resultResponse?.body || {})
  }
}

export { SignUpControllerExpressdapter }
