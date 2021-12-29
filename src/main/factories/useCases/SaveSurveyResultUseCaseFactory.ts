import { DbSaveSurveyResultUseCase } from '../../../data/useCases/SaveSurveyResultUseCase/DbSaveSurveyResultUseCase'
import { SaveSurveyResultUseCase } from '../../../domain/useCases/SaveSurveyResultUseCase'
import { surveyResultRepositoryFactory } from '../repositories/SaveSurveyResultRepositoryFactory'

const saveSurveyResultUseCaseFactory = (): SaveSurveyResultUseCase => {
  const saveSurveyResultRepository = surveyResultRepositoryFactory()
  return new DbSaveSurveyResultUseCase(
    saveSurveyResultRepository
  )
}

export { saveSurveyResultUseCaseFactory }
