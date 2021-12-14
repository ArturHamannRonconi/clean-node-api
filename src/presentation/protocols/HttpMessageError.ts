import { StatusCode } from './StatusCode'

interface HttpMessageError {
  statusCode: StatusCode
  body: any
}

export { HttpMessageError }
