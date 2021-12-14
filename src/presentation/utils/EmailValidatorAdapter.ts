import { EmailValidator } from '../protocols'

class EmailValidatorAdapter implements EmailValidator {
  isValid (field: string): boolean {
    return false
  }
}

export { EmailValidatorAdapter }
