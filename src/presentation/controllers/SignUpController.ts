import badRequest from '../helpers/badRequest'
import Controller from '../protocols/Controller'
import EmailValidator from '../protocols/EmailValidator'
import { HttpRequest, HttpResponse } from '../protocols/HttpAnnouncements'
import { InvalidParamError, MissingParamError } from '../errors'
import serverError from '../helpers/serverError'

class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator
  ) { }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const { email } = httpRequest.body
      const fields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of fields) {
        if (!httpRequest.body[field]) return badRequest(
          new MissingParamError(`Missing param: ${field}`)
        )
      }

      const emailIsValid = this
        .emailValidator
        .isValid(email as string)

      if (!emailIsValid) return badRequest(
        new InvalidParamError('email')
      )
    } catch (error) {
      return serverError()
    }
  }
}

export default SignUpController
