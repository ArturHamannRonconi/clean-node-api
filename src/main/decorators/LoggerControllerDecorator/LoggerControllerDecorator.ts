import { Controller } from '../../../presentation/protocols'
import { LoggerRepository } from '../../../data/protocols/LoggerRepository'
import { HttpRequest, HttpResponse } from '../../../presentation/protocols/http'

class LoggerControllerDecorator<T> implements Controller<T> {
  constructor (
    private readonly controller: Controller<T>,
    private readonly loggerRepository: LoggerRepository
  ) { }

  async handle (httpRequest: HttpRequest<T>): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    if (httpResponse.message)
      await this.loggerRepository.log(httpResponse.message)

    return httpResponse
  }
}

export { LoggerControllerDecorator }
