import { StatusCode, HttpMessageError } from '../protocols'

const badRequest = (err: Error): HttpMessageError => ({
  statusCode: StatusCode.BAD_REQUEST,
  body: err
})

export { badRequest }
