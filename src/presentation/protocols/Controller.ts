import { HttpRequest, HttpResponse } from './HttpAnnouncements'

interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}

export { Controller }
