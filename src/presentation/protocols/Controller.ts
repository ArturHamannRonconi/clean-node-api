import { HttpRequest, HttpResponse } from './http'

interface Controller<T> {
  handle: (httpRequest: HttpRequest<T>) => Promise<HttpResponse>
}

export { Controller }
