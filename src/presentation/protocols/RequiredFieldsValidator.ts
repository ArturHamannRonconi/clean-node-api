import { HttpRequest } from '.'

interface RequiredFieldsValidator {
  validate: (httpRequest: HttpRequest) => Promise<Error>
}

export { RequiredFieldsValidator }
