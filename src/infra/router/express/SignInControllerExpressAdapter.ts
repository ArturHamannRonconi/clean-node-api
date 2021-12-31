import { Request, Response } from 'express'
import { RouterAdapter } from '../RouterAdapter'
import { signInFacotry } from '../../../main/factories/controllers/SignInControllerFactory'
import { SignInRequest } from '../../../presentation/controllers/login/SignInController/SignInRequest'

class SignInControllerExpressAdapter {
  static async handle (request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    return await RouterAdapter.getExpressResponse<SignInRequest>(
      { email, password },
      response,
      signInFacotry
    )
  }
}

export { SignInControllerExpressAdapter }
