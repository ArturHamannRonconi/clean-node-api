import { Header } from './Header'
import { Json } from './Json'

interface HttpRequest<T> {
  body?: T
  headers?: Json
}

interface HttpResponse {
  statusCode?: number
  body?: Json | Error
  headers?: Header[]
  message?: string
}

export { HttpRequest, HttpResponse }
