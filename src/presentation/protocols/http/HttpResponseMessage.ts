import { StatusCode } from '.'

interface HttpResponseMessage {
  statusCode: StatusCode
  body: any
  description?: string
}

export { HttpResponseMessage }
