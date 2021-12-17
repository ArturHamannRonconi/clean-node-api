import { AuthenticationUseCase } from '../../../domain/useCases/AuthenticationUseCase'
import { badRequest, serverError, success, unautorized } from '../../helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { RequiredFieldsValidator } from '../../protocols/RequiredFieldsValidator'
import { SignInHttpRequestBody } from './SignInHttpRequestBody'

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
        .validate(httpRequest)

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
