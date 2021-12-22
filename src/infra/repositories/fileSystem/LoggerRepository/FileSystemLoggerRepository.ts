import { existsSync } from 'fs'
import { appendFile, writeFile } from 'fs/promises'
import { LoggerRepository } from '../../../../data/protocols/repositories/LoggerRepository'

class FileSystemLoggerRepository implements LoggerRepository {
  private readonly LOG_FORMAT = '[DATE] : "DESCRIPTION"'

  constructor (
    private readonly fileName: string
  ) { }

  async log (description: string): Promise<void> {
    const log = this.formatLog(description)

    if (!existsSync(this.fileName))
      await this.createLogFile()

    await appendFile(this.fileName, log)
  }

  private async createLogFile (): Promise<void> {
    await writeFile(this.fileName, this.LOG_FORMAT)
  }

  private formatLog (description: string): string {
    return `\n[${new Date().toUTCString()}] : "${description}"`
  }
}

export { FileSystemLoggerRepository }
