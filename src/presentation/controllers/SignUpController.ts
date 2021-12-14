import MissingParamError from '../errors/MissingParamError'
import badRequest from '../helpers/badRequest'
import Controller from '../protocols/Controller'
import { HttpRequest, HttpResponse } from '../protocols/HttpAnnouncements'

class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const fields = ['name', 'email']

    for (const field of fields) {
      if (!httpRequest.body[field])
        return badRequest(
          new MissingParamError(`Missing param: ${field}`)
        )
    }
  }
}

export default SignUpController
