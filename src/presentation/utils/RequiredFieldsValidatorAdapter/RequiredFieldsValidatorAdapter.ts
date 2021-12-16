import { MissingParamError } from '../../errors'
import { HttpRequest } from '../../protocols'
import { RequiredFieldsValidator } from '../../protocols/RequiredFieldsValidator'

class RequiredFieldsValidatorAdapter implements RequiredFieldsValidator {
  constructor (
    private readonly fields: string[]
  ) { }

  async validate (httpRequest: HttpRequest): Promise<Error> {
    for (const field of this.fields) {
      if (!httpRequest.body[field])
        return new MissingParamError(field)
    }
  }
}

export { RequiredFieldsValidatorAdapter }
