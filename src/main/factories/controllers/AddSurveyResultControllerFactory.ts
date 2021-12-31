import { AddSurveyResultController } from '../../../presentation/controllers/surveyResult/AddSurveyResultController'
import { AddSurveyResultRequest } from '../../../presentation/controllers/surveyResult/AddSurveyResultController/AddSurveyResultRequest'
import { Controller } from '../../../presentation/protocols'
import { loggerDecoratorFactory } from '../decorators/LoggerDecoratorFactory'
import { loadSurveyByIdUseCaseFactory } from '../useCases/LoadSurveyByIdUseCaseFactory'
import { saveSurveyResultUseCaseFactory } from '../useCases/SaveSurveyResultUseCaseFactory'

const addSurveyResultControllerFactory = (): Controller<AddSurveyResultRequest> => {
  const addSurveyResultController = new AddSurveyResultController(
    loadSurveyByIdUseCaseFactory(),
    saveSurveyResultUseCaseFactory()
  )

  return loggerDecoratorFactory<AddSurveyResultRequest>(
    addSurveyResultController
  )
}

export { addSurveyResultControllerFactory }
