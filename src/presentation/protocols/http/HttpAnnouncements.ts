import { Header, Json } from '.'

interface HttpRequest<B> {
  body?: B
  params?: any
  headers?: Json
}

interface HttpResponse {
  statusCode?: number
  body?: Json | Error
  headers?: Header[]
  message?: string
}

export { HttpRequest, HttpResponse }
