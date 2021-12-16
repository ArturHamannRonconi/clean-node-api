import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'
import { LoggerControllerDecorator } from './LoggerControllerDecorator'

const makeGenericController = (): Controller => {
  class GenericController implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise(resolve => resolve(null))
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
})
