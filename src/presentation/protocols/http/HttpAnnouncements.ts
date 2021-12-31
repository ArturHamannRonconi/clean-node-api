import { Header, Json } from '.'

interface HttpResponse {
  statusCode?: number
  body?: Json | Error
  headers?: Header[]
  message?: string
}

export { HttpResponse }
