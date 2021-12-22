import { MissingParamError } from '../../../presentation/utils/errors'
import { Json } from '../../../presentation/protocols/http'
import { RequiredFieldsValidator } from '../../../presentation/protocols/validators'

class RequiredFieldsValidatorAdapter implements RequiredFieldsValidator {
  constructor (
    private readonly fields: string[]
  ) { }

  require (body: Json): Error {
    for (const field of this.fields) {
      if (!body[field])
        return new MissingParamError(field)
    }

    return null
  }

  async validate (body: Json): Promise<Error> {
    return this.require(body)
  }
}

export { RequiredFieldsValidatorAdapter }
