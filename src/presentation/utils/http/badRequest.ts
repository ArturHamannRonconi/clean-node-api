import { StatusCode, HttpResponseMessage } from '../../protocols/http'

const badRequest = (err: Error): HttpResponseMessage => ({
  statusCode: StatusCode.BAD_REQUEST,
  body: { error: err.message }
})

export { badRequest }
