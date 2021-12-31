import { Controller } from '../../../presentation/protocols'
import { loggerDecoratorFactory } from '../decorators/LoggerDecoratorFactory'
import { AddSurveyRequest } from '../../../presentation/controllers/survey/AddSurveyController/AddSurveyRequest'
import { addSurveyUseCaseFactory } from '../useCases/AddSurveyUseCaseFactory'
import { AddSurveyController } from '../../../presentation/controllers/survey/AddSurveyController'
import { ValidationComposite } from '../../../infra/validators/ValidationComposite'
import { RequiredFieldsValidatorAdapter } from '../../../infra/validators/RequiredFieldsValidatorAdapter'

const addSurveyControllerFactory = (): Controller<AddSurveyRequest> => {
  const validation = new ValidationComposite([
    new RequiredFieldsValidatorAdapter(['question', 'answers'])
  ])
  const addSurveyController = new AddSurveyController(
    validation,
    addSurveyUseCaseFactory()
  )

  return loggerDecoratorFactory<AddSurveyRequest>(addSurveyController)
}

export { addSurveyControllerFactory }
