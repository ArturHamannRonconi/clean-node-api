import { Validation } from '.'

interface Comparator {
  compared: string
  comparable: string
}

interface CompareValidator extends Validation {
  compare: (comparator: Comparator) => Error
}

export { CompareValidator, Comparator }
