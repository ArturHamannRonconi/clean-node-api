import { Json } from '../http'

interface Validation {
  validate: (body: Json) => Promise<Error>
}

export { Validation }
