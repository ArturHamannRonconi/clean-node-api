import { badRequest, serverError } from '../helpers'
import { Controller, EmailValidator, Json } from '../protocols'
import { InvalidParamError, MissingParamError } from '../errors'
import { HttpRequest, HttpResponse } from '../protocols/HttpAnnouncements'
import { AddAccount } from '../../domain/useCases'
import { success } from '../helpers/success'

interface HttpRequestBody {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly emailValidator: EmailValidator
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password, passwordConfirmation, name } =
        httpRequest.body as unknown as HttpRequestBody
      const fields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of fields) {
        if (!httpRequest.body[field]) return badRequest(
          new MissingParamError(`Missing param: ${field}`)
        )
      }

      if (password !== passwordConfirmation)
        return badRequest(new InvalidParamError('passwordConfirmation'))

      const emailIsValid = this
        .emailValidator
        .isValid(email)

      if (!emailIsValid) return badRequest(
        new InvalidParamError('email')
      )

      const accountData = await this.addAccount
        .add({ email, name, password }) as unknown as Json

      return success(accountData)
    } catch (error) {
      return serverError()
    }
  }
}

export { SignUpController }
