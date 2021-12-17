import { HttpRequest, HttpResponse } from './HttpAnnouncements'

interface Controller<T> {
  handle: (httpRequest: HttpRequest<T>) => Promise<HttpResponse>
}

export { Controller }
