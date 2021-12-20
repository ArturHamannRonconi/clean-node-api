import { ServerError } from '../errors'
import { StatusCode, HttpResponseMessage } from '../../protocols/http'

const serverError = (description: string): HttpResponseMessage => ({
  statusCode: StatusCode.INTERNAL_SERVER,
  body: new ServerError(),
  description
})

export { serverError }
