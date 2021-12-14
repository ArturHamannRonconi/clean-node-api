import { HttpRequest, HttpResponse } from './HttpAnnouncements'

interface Controller {
  handle: (httpRequest: HttpRequest) => HttpResponse
}

export { Controller }
