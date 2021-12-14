import { Json } from './Json'

interface HttpRequest {
  body?: Json
  headers?: Json
}

interface HttpResponse {
  statusCode?: number
  body?: Json | Error
  headers?: Json
}

export { HttpRequest, HttpResponse }
