import badRequest from '../helpers/badRequest'

class SignUpController {
  handle (httpRequest: any): any {
    const fields = ['name', 'email']

    for (const field of fields) {
      if (!httpRequest.body[field])
        return badRequest(
          new Error(`Missing param: ${field}`)
        )
    }
  }
}

export default SignUpController
