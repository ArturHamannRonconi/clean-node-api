import { Validation } from './Validation'

interface EmailValidator extends Validation {
  isValid: (email: string) => Error
}

export { EmailValidator }
