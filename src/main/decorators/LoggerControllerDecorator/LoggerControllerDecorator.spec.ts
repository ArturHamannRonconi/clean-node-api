import { join } from 'path'
import { existsSync } from 'fs'
import { rm } from 'fs/promises'

import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'
import { LoggerControllerDecorator } from './LoggerControllerDecorator'

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

interface SutTypes {
  sut: LoggerControllerDecorator
  controller: Controller
}

const makeSUT = (filePath: string): SutTypes => {
  const controller = makeGenericController()

  const sut = new LoggerControllerDecorator(
    controller,
    filePath
  )

  return {
    sut,
    controller
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

  it('Should call controller', async () => {
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

  it('Should be able to record request and response data in Log files', async () => {
    const { sut } = makeSUT(filePath)
    const httpRequest = {
      body: {
        name: 'user',
        email: 'user@mail.com',
        password: 'asdj312DSAi@',
        passwordConfirmation: 'asdj312DSAi@'
      }
    }

    await sut.handle(httpRequest)
    expect(existsSync(filePath)).toBeTruthy()
  })
})
