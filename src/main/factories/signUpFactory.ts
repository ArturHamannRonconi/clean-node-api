import { Controller } from '../../presentation/protocols'
import { SignUpController } from '../../presentation/controllers/SignUpController'
import { LoggerControllerDecorator } from '../decorators/LoggerControllerDecorator/LoggerControllerDecorator'
import { BcryptEncryptAdapter } from '../../infra/Cryptography/BcryptEncrypterAdapter'
import { EmailValidatorAdapter } from '../../presentation/utils/EmailValidatorAdapter'
import { DbAddAccountUseCase } from '../../data/useCases/AddAccount/DbAddAccountUseCase'
import { AccountMongoRepository } from '../../infra/db/mongodb/AccountRepository/AccountMongoRepository'

const signUpFactory = (): Controller => {
  const addAccount = new DbAddAccountUseCase(
    new BcryptEncryptAdapter(12),
    new AccountMongoRepository()
  )

  const emailValidator = new EmailValidatorAdapter()

  const signUpController = new SignUpController(
    addAccount,
    emailValidator
  )

  return new LoggerControllerDecorator(signUpController)
}

export { signUpFactory }
