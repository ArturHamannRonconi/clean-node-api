import { Controller } from '../../../presentation/protocols'
import { loadSurveysUseCaseFactory } from '../useCases/LoadSurveysUseCaseFactory'
import { LoadSurveysController } from '../../../presentation/controllers/survey/LoadSurveysController'
import { loggerDecoratorFactory } from '../decorators/LoggerDecoratorFactory'

const loadSurveysControllerFactory = (): Controller<void> => {
  const loadSurveysController = new LoadSurveysController(
    loadSurveysUseCaseFactory()
  )

  return loggerDecoratorFactory<void>(loadSurveysController)
}

export { loadSurveysControllerFactory }
