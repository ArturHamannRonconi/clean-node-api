import { Controller } from '../../../protocols/Controller'
import { Validation } from '../../../protocols/validators'
import { SignInHttpRequestBody } from './SignInHttpRequestBody'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { badRequest, serverError, success, unautorized } from '../../../utils/http'
import { AuthenticationUseCase } from '../../../../domain/useCases/AuthenticationUseCase'

class SignInController implements Controller<SignInHttpRequestBody> {
  constructor (
    private readonly validation: Validation,
    private readonly authenticationUseCase: AuthenticationUseCase
  ) { }

  async handle (httpRequest: HttpRequest<SignInHttpRequestBody>): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      const error = await this.validation
        .validate({ ...httpRequest.body })
      if (error) return badRequest(error)

      const token = await this
        .authenticationUseCase
        .auth({ email, password })
      if (!token) return unautorized()

      return success({ ...token })
    } catch (error) {
      return serverError(error)
    }
  }
}

export { SignInController }
