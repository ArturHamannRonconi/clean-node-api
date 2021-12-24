import { HttpRequest, HttpResponse } from './http'

interface Middleware {
  handle: (httpRequest: HttpRequest<any>) => Promise<HttpResponse>
}

export { Middleware }
