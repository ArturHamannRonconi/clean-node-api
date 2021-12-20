import validator from 'validator'
import { InvalidParamError } from '../../../presentation/utils/errors'
import { EmailValidator } from '../../../presentation/protocols/validators'
import { Json } from '../../../presentation/protocols/http'

class EmailValidatorAdapter implements EmailValidator {
  async validate ({ email }: Json): Promise<Error> {
    return this.isValid(email as string)
  }

  isValid (email: string): Error {
    return validator.isEmail(email)
      ? null
      : new InvalidParamError('email')
  }
}

export { EmailValidatorAdapter }
