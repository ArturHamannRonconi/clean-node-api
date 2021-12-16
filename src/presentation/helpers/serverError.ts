import { ServerError } from '../errors'
import { StatusCode, HttpResponseMessage } from '../protocols'

const serverError = (description: string): HttpResponseMessage => ({
  statusCode: StatusCode.INTERNAL_SERVER,
  body: new ServerError(),
  description
})

export { serverError }
