import { LoggerRepository } from '../../../data/protocols/LoggerRepository'
import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols/http'

class LoggerControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly loggerRepository: LoggerRepository
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    if (httpResponse.message)
      await this.loggerRepository.log(httpResponse.message)

    return httpResponse
  }
}

export { LoggerControllerDecorator }
