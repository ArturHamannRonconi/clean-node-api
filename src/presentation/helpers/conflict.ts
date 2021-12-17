import { StatusCode, HttpResponseMessage } from '../protocols'

const conflict = (err: Error): HttpResponseMessage => ({
  statusCode: StatusCode.CONFLICT,
  body: err
})

export { conflict }
