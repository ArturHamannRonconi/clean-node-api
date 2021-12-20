import validator from 'validator'
import { InvalidParamError } from '../../../presentation/utils/errors'
import { EmailValidator } from '../../../presentation/protocols/validators'
import { Json } from '../../../presentation/protocols/http'

class EmailValidatorAdapter implements EmailValidator {
  async validate ({ email }: Json): Promise<Error> {
    return this.isValid(email as string)
  }

  isValid (email: string): Error {
    const emailIsValid = validator.isEmail(email)

    if (!emailIsValid)
      return new InvalidParamError('email')
    else
      return null
  }
}

export { EmailValidatorAdapter }
