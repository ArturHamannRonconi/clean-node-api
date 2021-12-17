import { badRequest, serverError, created, conflict } from '../../helpers'
import { Controller, EmailValidator, Json } from '../../protocols'
import { AccountAlreadyExistsError, InvalidParamError } from '../../errors'
import { HttpRequest, HttpResponse } from '../../protocols/HttpAnnouncements'
import { AddAccountUseCase } from '../../../domain/useCases/AddAccountUseCase'
import { RequiredFieldsValidator } from '../../protocols/RequiredFieldsValidator'
import { VerifyAccountExistsUseCase } from '../../../domain/useCases/VerifyAccountExistsUseCase'
import { SignUpHttpRequestBody } from './SignUpHttpRequestBody'

class SignUpController implements Controller<SignUpHttpRequestBody> {
  constructor (
    private readonly addAccountUseCase: AddAccountUseCase,
    private readonly emailValidator: EmailValidator,
    private readonly requiredFieldsValidator: RequiredFieldsValidator,
    private readonly verifyAccountExistsUseCase: VerifyAccountExistsUseCase
  ) { }

  async handle (httpRequest: HttpRequest<SignUpHttpRequestBody>): Promise<HttpResponse> {
    try {
      const { email, password, passwordConfirmation, name } = httpRequest.body

      const absenceFields = await this
        .requiredFieldsValidator
        .validate(httpRequest)

      if (absenceFields) return badRequest(absenceFields)

      if (password !== passwordConfirmation)
        return badRequest(new InvalidParamError('passwordConfirmation'))

      const emailIsValid = this
        .emailValidator
        .isValid(email)

      if (!emailIsValid) return badRequest(
        new InvalidParamError('email')
      )

      const accountAlreadyExists = await this
        .verifyAccountExistsUseCase
        .verify({ email })

      if (accountAlreadyExists)
        return conflict(new AccountAlreadyExistsError())

      const accountData = await this.addAccountUseCase
        .add({ email, name, password }) as unknown as Json

      return created(accountData)
    } catch (error) {
      return serverError(error.message)
    }
  }
}

export { SignUpController }
