import { StatusCode, HttpResponseMessage } from '../../protocols/http'

const conflict = (err: Error): HttpResponseMessage => ({
  statusCode: StatusCode.CONFLICT,
  body: { error: err.message }
})

export { conflict }
