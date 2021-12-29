import { AddSurveyResultController } from '../../../presentation/controllers/surveyResult/AddSurveyResultController'
import { AddSurveyResultHttpRequestBody } from '../../../presentation/controllers/surveyResult/AddSurveyResultController/AddSurveyResultHttpRequestBody'
import { Controller } from '../../../presentation/protocols'
import { loggerDecoratorFactory } from '../decorators/LoggerDecoratorFactory'
import { loadSurveyByIdUseCaseFactory } from '../useCases/LoadSurveyByIdUseCaseFactory'
import { saveSurveyResultUseCaseFactory } from '../useCases/SaveSurveyResultUseCaseFactory'

const addSurveyResultControllerFactory = (): Controller<AddSurveyResultHttpRequestBody> => {
  const addSurveyResultController = new AddSurveyResultController(
    loadSurveyByIdUseCaseFactory(),
    saveSurveyResultUseCaseFactory()
  )

  return loggerDecoratorFactory<AddSurveyResultHttpRequestBody>(
    addSurveyResultController
  )
}

export { addSurveyResultControllerFactory }
