import { Json } from '../../../presentation/protocols/http'
import { Comparator, CompareValidator } from '../../../presentation/protocols/validators/CompareValidator'
import { CompareError } from '../../../presentation/utils/errors'

class CompareValidatorAdapter implements CompareValidator {
  compare ({ comparable, compared }: Comparator): Error {
    return compared === comparable
      ? null
      : new CompareError()
  }

  async validate (body: Json): Promise<Error> {
    return this.compare({
      compared: body.password as string,
      comparable: body.passwordConfirmation as string
    })
  }
}

export { CompareValidatorAdapter }
