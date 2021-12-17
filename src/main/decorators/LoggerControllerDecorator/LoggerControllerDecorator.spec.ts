import { join } from 'path'
import { rm } from 'fs/promises'

import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'
import { LoggerControllerDecorator } from './LoggerControllerDecorator'
import { LoggerRepository } from '../../../data/protocols/LoggerRepository'

const makeGenericController = (): Controller => {
  class GenericController implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        body: { ok: 'ok' },
        statusCode: 200,
        message: 'NEW LOG'
      }

      return await new Promise(resolve => resolve(httpResponse))
    }
  }

  return new GenericController()
}

const makeGenericLoggerRepository = (): LoggerRepository => {
  class GenericLoggerRepository implements LoggerRepository {
    async log (description: string): Promise<void> {
      return await new Promise(resolve => resolve(null))
    }
  }

  return new GenericLoggerRepository()
}

interface SutTypes {
  sut: LoggerControllerDecorator
  controller: Controller
  loggerRepository: LoggerRepository
}

const makeSUT = (filePath: string): SutTypes => {
  const controller = makeGenericController()
  const loggerRepository = makeGenericLoggerRepository()

  const sut = new LoggerControllerDecorator(
    controller,
    loggerRepository
  )

  return {
    sut,
    controller,
    loggerRepository
  }
}

describe('Logger Controller Decorator', () => {
  let filePath: string

  beforeAll(() => { filePath = join(__dirname, '..', '..', '..', '..', 'test_log') })
  afterEach(async () => await rm(filePath, { force: true }))

  it('Should call controller', async () => {
    const { sut, controller } = makeSUT(filePath)
    const handleSpy = jest.spyOn(controller, 'handle')

    const httpRequest = {
      body: { ok: 'ok' }
    }

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  it('Should return httpResponse if controller return httpResponse', async () => {
    const { sut } = makeSUT(filePath)

    const httpRequest = {
      body: { ok: 'ok' }
    }

    const result = await sut.handle(httpRequest)
    expect(result).toEqual({
      body: { ok: 'ok' },
      statusCode: 200,
      message: 'NEW LOG'
    })
  })

  it('Should be able call a log function on logRepository', async () => {
    const { sut, loggerRepository } = makeSUT(filePath)
    const logSpy = jest.spyOn(loggerRepository, 'log')

    const httpRequest = {
      body: {
        name: 'user',
        email: 'user@mail.com',
        password: 'asdj312DSAi@',
        passwordConfirmation: 'asdj312DSAi@'
      }
    }

    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('NEW LOG')
  })
})
