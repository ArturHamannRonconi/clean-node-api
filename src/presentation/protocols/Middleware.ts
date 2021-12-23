import { HttpRequest, HttpResponse } from './http'

interface Middleware<T> {
  handle: (httpRequest: HttpRequest<T>) => Promise<HttpResponse>
}

export { Middleware }
