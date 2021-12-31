import { RequiredFieldsValidatorAdapter } from '../../../infra/validators/RequiredFieldsValidatorAdapter'
import { ValidationComposite } from '../../../infra/validators/ValidationComposite'
import { SignInController } from '../../../presentation/controllers/login/SignInController'
import { SignInRequest } from '../../../presentation/controllers/login/SignInController/SignInRequest'
import { Controller } from '../../../presentation/protocols'
import { dbAuthenticationUseCaseFactory } from '../useCases/AuthenticationUseCaseFactory'
import { loggerDecoratorFactory } from '../decorators/LoggerDecoratorFactory'

const signInFacotry = (): Controller<SignInRequest> => {
  const validation = new ValidationComposite([
    new RequiredFieldsValidatorAdapter(['email', 'password'])
  ])
  const authenticationUseCase = dbAuthenticationUseCaseFactory()
  const signInController = new SignInController(
    validation,
    authenticationUseCase
  )

  return loggerDecoratorFactory<SignInRequest>(signInController)
}

export { signInFacotry }
