import { Controller } from '../../../presentation/protocols'
import { loggerDecoratorFactory } from '../decorators/LoggerDecoratorFactory'
import { AddSurveyHttpRequestBody } from '../../../presentation/controllers/survey/AddSurveyController/AddSurveyHttpRequestBody'
import { addSurveyUseCaseFactory } from '../useCases/AddSurveyUseCaseFactory'
import { AddSurveyController } from '../../../presentation/controllers/survey/AddSurveyController'
import { ValidationComposite } from '../../../infra/validators/ValidationComposite'
import { RequiredFieldsValidatorAdapter } from '../../../infra/validators/RequiredFieldsValidatorAdapter'

const addSurveyControllerFactory = (): Controller<AddSurveyHttpRequestBody> => {
  const validation = new ValidationComposite([
    new RequiredFieldsValidatorAdapter([
      'question', 'answers'
    ])
  ])
  const addSurveyController = new AddSurveyController(
    validation,
    addSurveyUseCaseFactory()
  )

  return loggerDecoratorFactory<AddSurveyHttpRequestBody>(addSurveyController)
}

export { addSurveyControllerFactory }
