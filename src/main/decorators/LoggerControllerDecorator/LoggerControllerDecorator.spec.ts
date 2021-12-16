import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'
import { LoggerControllerDecorator } from './LoggerControllerDecorator'

const makeGenericController = (): Controller => {
  class GenericController implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        body: { ok: 'ok' },
        statusCode: 200
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

const makeSUT = (): SutTypes => {
  const controller = makeGenericController()
  const sut = new LoggerControllerDecorator(controller)

  return {
    sut,
    controller
  }
}

describe('Logger Controller Decorator', () => {
  it('Should call controller', async () => {
    const { sut, controller } = makeSUT()
    const handleSpy = jest.spyOn(controller, 'handle')

    const httpRequest = {
      body: { ok: 'ok' }
    }

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  it('Should call controller', async () => {
    const { sut } = makeSUT()

    const httpRequest = {
      body: { ok: 'ok' }
    }

    const result = await sut.handle(httpRequest)
    expect(result).toEqual({
      body: { ok: 'ok' },
      statusCode: 200
    })
  })
})
