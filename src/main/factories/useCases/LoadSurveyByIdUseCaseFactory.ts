import { DbLoadSurveyByIdUseCase } from '../../../data/useCases/LoadSurveyById/DbLoadSurveyByIdUseCase'
import { LoadSurveyByIdUseCase } from '../../../domain/useCases/LoadSurveyByIdUseCase'
import { SurveyMongoRepository } from '../../../infra/repositories/database/mongodb/SurveyRepository/SurveyMongoRepository'

const loadSurveyByIdUseCaseFactory = (): LoadSurveyByIdUseCase => {
  const findSurveyRepository = new SurveyMongoRepository()
  return new DbLoadSurveyByIdUseCase(
    findSurveyRepository
  )
}

export { loadSurveyByIdUseCaseFactory }
