import { Json } from '../../../presentation/protocols/http'
import { Validation } from '../../../presentation/protocols/validators/Validation'

class ValidationComposite implements Validation {
  constructor (
    private readonly validations: Validation[]
  ) { }

  async validate (input: Json): Promise<Error> {
    for await (const validation of this.validations) {
      const error = await validation.validate(input)
      if (error) return error
    }

    return null
  }
}

export { ValidationComposite }
