import { Controller } from '../../presentation/protocols'
import { SignUpController } from '../../presentation/controllers/SignUpController'
import { LoggerControllerDecorator } from '../decorators/LoggerControllerDecorator/LoggerControllerDecorator'
import { BcryptEncryptAdapter } from '../../infra/Cryptography/BcryptEncrypterAdapter'
import { EmailValidatorAdapter } from '../../presentation/utils/EmailValidatorAdapter/EmailValidatorAdapter'
import { DbAddAccountUseCase } from '../../data/useCases/AddAccount/DbAddAccountUseCase'
import { AccountMongoRepository } from '../../infra/db/mongodb/AccountRepository/AccountMongoRepository'
import { join } from 'path'
import { RequiredFieldsValidatorAdapter } from '../../presentation/utils/RequiredFieldsValidatorAdapter/RequiredFieldsValidatorAdapter'

const signUpFactory = (): Controller => {
  const addAccount = new DbAddAccountUseCase(
    new BcryptEncryptAdapter(12),
    new AccountMongoRepository()
  )
  const requiredFieldsValidator = new RequiredFieldsValidatorAdapter(
    ['email', 'name', 'password', 'passwordConfirmation']
  )
  const emailValidator = new EmailValidatorAdapter()

  const filePath = join(__dirname, '..', '..', '..', '..', 'log')

  const signUpController = new SignUpController(
    addAccount,
    emailValidator,
    requiredFieldsValidator
  )

  return new LoggerControllerDecorator(
    signUpController,
    filePath
  )
}

export { signUpFactory }
