import { StatusCode } from './StatusCode'

interface HttpResponseMessage {
  statusCode: StatusCode
  body: any
}

export { HttpResponseMessage }
