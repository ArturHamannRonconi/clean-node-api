import { Controller } from '../../../presentation/protocols'
import { loadSurveysUseCaseFactory } from '../useCases/LoadSurveysUseCaseFactory'
import { LoadSurveysController } from '../../../presentation/controllers/survey/LoadSurveysController'

const loadSurveysControllerFactory = (): Controller<void> => {
  return new LoadSurveysController(
    loadSurveysUseCaseFactory()
  )
}

export { loadSurveysControllerFactory }
