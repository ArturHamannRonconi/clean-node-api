import { Controller } from '../../../presentation/protocols'
import { SignUpController } from '../../../presentation/controllers/login/SignUpController'
import { ValidationComposite } from '../../../infra/validators/ValidationComposite'
import { EmailValidatorAdapter } from '../../../infra/validators/EmailValidatorAdapter'
import { SignUpRequest } from '../../../presentation/controllers/login/SignUpController/SignUpRequest'
import { RequiredFieldsValidatorAdapter } from '../../../infra/validators/RequiredFieldsValidatorAdapter'
import { addUseCaseFactory } from '../useCases/AddAccountUseCaseFactory'
import { verifyAccountExistsUseCaseFactory } from '../useCases/VerifyAccountExistsUseCase'
import { loggerDecoratorFactory } from '../decorators/LoggerDecoratorFactory'

const signUpFactory = (): Controller<SignUpRequest> => {
  const addAccount = addUseCaseFactory()
  const verifyAccountExists = verifyAccountExistsUseCaseFactory()
  const requiredFieldsValidator = new RequiredFieldsValidatorAdapter(
    ['email', 'name', 'password', 'passwordConfirmation']
  )
  const emailValidator = new EmailValidatorAdapter()
  const validationComposite = new ValidationComposite([
    requiredFieldsValidator,
    emailValidator
  ])

  const signUpController = new SignUpController(
    addAccount,
    verifyAccountExists,
    validationComposite
  )

  return loggerDecoratorFactory<SignUpRequest>(signUpController)
}

export { signUpFactory }
