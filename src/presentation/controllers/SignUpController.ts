import badRequest from '../helpers/badRequest'
import Controller from '../protocols/Controller'
import EmailValidator from '../protocols/EmailValidator'
import { StatusCode } from '../protocols/HttpMessageError'
import { HttpRequest, HttpResponse } from '../protocols/HttpAnnouncements'
import { InvalidParamError, MissingParamError, ServerError } from '../errors'

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
      return {
        statusCode: StatusCode.INTERNAL_SERVER,
        body: new ServerError()
      }
    }
  }
}

export default SignUpController
