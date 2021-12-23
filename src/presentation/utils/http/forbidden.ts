import { HttpResponseMessage, StatusCode } from '../../protocols/http'

const forbidden = (err: Error): HttpResponseMessage => ({
  statusCode: StatusCode.FORBIDDEN,
  body: err
})

export { forbidden }
