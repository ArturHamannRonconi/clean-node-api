import { Header } from './Header'
import { Json } from './Json'

interface HttpRequest {
  body?: Json
  headers?: Json
}

interface HttpResponse {
  statusCode?: number
  body?: Json | Error
  headers?: Header[]
  message?: string
}

export { HttpRequest, HttpResponse }
