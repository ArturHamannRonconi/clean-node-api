import { StatusCode } from './StatusCode'

interface HttpResponseMessage {
  statusCode: StatusCode
  body: any
  description?: string
}

export { HttpResponseMessage }
