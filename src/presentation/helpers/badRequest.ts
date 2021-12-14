import { StatusCode, HttpResponseMessage } from '../protocols'

const badRequest = (err: Error): HttpResponseMessage => ({
  statusCode: StatusCode.BAD_REQUEST,
  body: err
})

export { badRequest }
