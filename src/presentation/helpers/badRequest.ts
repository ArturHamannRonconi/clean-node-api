import HttpMessageError, { StatusCode } from '../protocols/HttpMessageError'

const badRequest = (err: Error): HttpMessageError => ({
  statusCode: StatusCode.BAD_REQUEST,
  body: err
})

export default badRequest
