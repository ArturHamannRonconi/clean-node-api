import { ServerError } from '../errors'
import HttpMessageError, { StatusCode } from '../protocols/HttpMessageError'

const serverError = (): HttpMessageError => ({
  statusCode: StatusCode.INTERNAL_SERVER,
  body: new ServerError()
})

export default serverError
