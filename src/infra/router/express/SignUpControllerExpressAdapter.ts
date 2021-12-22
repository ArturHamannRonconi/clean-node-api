import { Request, Response } from 'express'
import { ExpressAdapter } from './ExpressAdapter'
import { signUpFactory } from '../../../main/factories/controllers/SignUpControllerFactory'
import { SignUpHttpRequestBody } from '../../../presentation/controllers/SignUpController/SignUpHttpRequestBody'

class SignUpControllerExpressdapter {
  static async handle (request: Request, response: Response): Promise<Response> {
    return await ExpressAdapter.transformToExpressRequest<SignUpHttpRequestBody>(
      request,
      response,
      signUpFactory
    )
  }
}

export { SignUpControllerExpressdapter }
