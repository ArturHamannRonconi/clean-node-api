import { DbAddSurveyUseCase } from '../../../data/useCases/AddSurvey/DbAddSurveyUseCase'
import { AddSurveyUseCase } from '../../../domain/useCases/AddSurveyUseCase'
import { surveyRepositoryFactory } from '../repositories/SurveyRepositoryFactory'

const addSurveyUseCaseFactory = (): AddSurveyUseCase => {
  return new DbAddSurveyUseCase(
    surveyRepositoryFactory()
  )
}

export { addSurveyUseCaseFactory }
