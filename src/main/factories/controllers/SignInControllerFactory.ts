import { RequiredFieldsValidatorAdapter } from '../../../infra/validators/RequiredFieldsValidatorAdapter'
import { ValidationComposite } from '../../../infra/validators/ValidationComposite'
import { SignInController } from '../../../presentation/controllers/SignInController'
import { SignInHttpRequestBody } from '../../../presentation/controllers/SignInController/SignInHttpRequestBody'
import { Controller } from '../../../presentation/protocols'
import { dbAuthenticationUseCaseFactory } from '../useCases/AuthenticationUseCaseFactory'
import { loggerDecoratorFactory } from '../decorators/LoggerDecoratorFactory'

const signInFacotry = (): Controller<SignInHttpRequestBody> => {
  const validation = new ValidationComposite([
    new RequiredFieldsValidatorAdapter(['email', 'password'])
  ])
  const authenticationUseCase = dbAuthenticationUseCaseFactory()
  const signInController = new SignInController(
    validation,
    authenticationUseCase
  )

  return loggerDecoratorFactory<SignInHttpRequestBody>(signInController)
}

export { signInFacotry }
