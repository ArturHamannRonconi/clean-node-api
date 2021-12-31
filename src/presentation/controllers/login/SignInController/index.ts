import { Controller } from '../../../protocols/Controller'
import { Validation } from '../../../protocols/validators'
import { SignInRequest } from './SignInRequest'
import { HttpResponse } from '../../../protocols/http'
import { badRequest, serverError, success, unautorized } from '../../../utils/http'
import { AuthenticationUseCase } from '../../../../domain/useCases/AuthenticationUseCase'

class SignInController implements Controller<SignInRequest> {
  constructor (
    private readonly validation: Validation,
    private readonly authenticationUseCase: AuthenticationUseCase
  ) { }

  async handle (request: SignInRequest): Promise<HttpResponse> {
    try {
      const { email, password } = request

      const error = await this.validation.validate(request)
      if (error) return badRequest(error)

      const token = await this
        .authenticationUseCase
        .auth({ email, password })
      if (!token) return unautorized()

      return success(token)
    } catch (error) {
      return serverError(error.message)
    }
  }
}

export { SignInController }
