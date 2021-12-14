import { ServerError } from '../errors'
import { StatusCode, HttpMessageError } from '../protocols'

const serverError = (): HttpMessageError => ({
  statusCode: StatusCode.INTERNAL_SERVER,
  body: new ServerError()
})

export { serverError }
