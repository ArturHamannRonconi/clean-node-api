import { HttpResponse } from './http'

interface Middleware {
  handle: (httpRequest: any) => Promise<HttpResponse>
}

export { Middleware }
