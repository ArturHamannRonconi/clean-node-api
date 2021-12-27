import { DbLoadSurveysUseCase } from '../../../data/useCases/LoadSurveysUseCase/DbLoadSurveysUseCase'
import { LoadSurveysUseCase } from '../../../domain/useCases/LoadSurveysUseCase'
import { surveyRepositoryFactory } from '../repositories/SurveyRepositoryFactory'

const loadSurveysUseCaseFactory = (): LoadSurveysUseCase => {
  return new DbLoadSurveysUseCase(
    surveyRepositoryFactory()
  )
}

export { loadSurveysUseCaseFactory }
