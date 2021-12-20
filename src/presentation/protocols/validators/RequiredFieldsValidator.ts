import { Json } from '../http'
import { Validation } from './Validation'

interface RequiredFieldsValidator extends Validation {
  require: (body: Json) => Error
}

export { RequiredFieldsValidator }
