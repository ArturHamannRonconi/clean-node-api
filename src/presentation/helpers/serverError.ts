import { ServerError } from '../errors'
import { StatusCode, HttpResponseMessage } from '../protocols'

const serverError = (): HttpResponseMessage => ({
  statusCode: StatusCode.INTERNAL_SERVER,
  body: new ServerError()
})

export { serverError }
