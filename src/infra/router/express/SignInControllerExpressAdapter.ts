import { Request, Response } from 'express'
import { ExpressAdapter } from './ExpressAdapter'
import { signInFacotry } from '../../../main/factories/controllers/SignInControllerFactory'
import { SignInHttpRequestBody } from '../../../presentation/controllers/login/SignInController/SignInHttpRequestBody'

class SignInControllerExpressAdapter {
  static async handle (request: Request, response: Response): Promise<Response> {
    return await ExpressAdapter.transformToExpressRequest<SignInHttpRequestBody>(
      request,
      response,
      signInFacotry
    )
  }
}

export { SignInControllerExpressAdapter }
