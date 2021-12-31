import { Request, Response } from 'express'
import { RouterAdapter } from '../RouterAdapter'
import { signUpFactory } from '../../../main/factories/controllers/SignUpControllerFactory'
import { SignUpRequest } from '../../../presentation/controllers/login/SignUpController/SignUpRequest'

class SignUpControllerExpressdapter {
  static async handle (request: Request, response: Response): Promise<Response> {
    const { email, name, password, passwordConfirmation } = request.body

    return await RouterAdapter.getExpressResponse<SignUpRequest>(
      { email, name, password, passwordConfirmation },
      response,
      signUpFactory
    )
  }
}

export { SignUpControllerExpressdapter }
