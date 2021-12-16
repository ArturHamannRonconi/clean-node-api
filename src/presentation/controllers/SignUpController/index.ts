import { badRequest, serverError, created } from '../../helpers'
import { Controller, EmailValidator, Json } from '../../protocols'
import { InvalidParamError } from '../../errors'
import { HttpRequest, HttpResponse } from '../../protocols/HttpAnnouncements'
import { AddAccountUseCase } from '../../../domain/useCases'
import { RequiredFieldsValidator } from '../../protocols/RequiredFieldsValidator'

interface HttpRequestBody {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

class SignUpController implements Controller {
  constructor (
    private readonly addAccountUseCase: AddAccountUseCase,
    private readonly emailValidator: EmailValidator,
    private readonly requiredFieldsValidator: RequiredFieldsValidator
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this
        .requiredFieldsValidator
        .validate(httpRequest)

      if (error) return badRequest(error)

      const { email, password, passwordConfirmation, name } =
        httpRequest.body as unknown as HttpRequestBody

      if (password !== passwordConfirmation)
        return badRequest(new InvalidParamError('passwordConfirmation'))

      const emailIsValid = this
        .emailValidator
        .isValid(email)

      if (!emailIsValid) return badRequest(
        new InvalidParamError('email')
      )

      const accountData = await this.addAccountUseCase
        .add({ email, name, password }) as unknown as Json

      return created(accountData)
    } catch (error) {
      return serverError(error.message)
    }
  }
}

export { SignUpController }
