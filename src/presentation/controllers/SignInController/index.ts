import { Controller } from '../../protocols/Controller'
import { SignInHttpRequestBody } from './SignInHttpRequestBody'
import { AuthenticationUseCase } from '../../../domain/useCases/AuthenticationUseCase'
import { RequiredFieldsValidator } from '../../protocols/validators'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, serverError, success, unautorized } from '../../utils/http'

class SignInController implements Controller<SignInHttpRequestBody> {
  constructor (
    private readonly requiredFieldsValidator: RequiredFieldsValidator,
    private readonly authenticationUseCase: AuthenticationUseCase
  ) { }

  async handle (httpRequest: HttpRequest<SignInHttpRequestBody>): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      const absenceFields = await this
        .requiredFieldsValidator
        .validate({ ...httpRequest.body })

      if (absenceFields)
        return badRequest(absenceFields)

      const token = await this
        .authenticationUseCase
        .auth({ email, password })

      if (!token)
        return unautorized()

      return success({ ...token })
    } catch (error) {
      return serverError(error)
    }
  }
}

export { SignInController }
