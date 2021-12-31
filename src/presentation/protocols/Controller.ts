import { HttpResponse } from './http'

interface Controller<T> {
  handle: (request: T) => Promise<HttpResponse>
}

export { Controller }
