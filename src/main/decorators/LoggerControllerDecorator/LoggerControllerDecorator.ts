import { existsSync } from 'fs'
import { appendFile, writeFile } from 'fs/promises'
import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'

class LoggerControllerDecorator implements Controller {
  private readonly LOG_FORMAT = '[DATE] : "DESCRIPTION"'

  constructor (
    private readonly controller: Controller,
    private readonly file_name: string
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    if (httpResponse.message)
      await this.log(httpResponse.message)

    return httpResponse
  }

  async log (description: string): Promise<void> {
    const log = this.formatLog(description)

    if (!existsSync(this.file_name))
      await this.createLogFile()

    await appendFile(this.file_name, log)
  }

  async createLogFile (): Promise<void> {
    await writeFile(this.file_name, this.LOG_FORMAT)
  }

  formatLog (description: string): string {
    return `\n[${new Date().toUTCString()}] : "${description}"`
  }
}

export { LoggerControllerDecorator }
