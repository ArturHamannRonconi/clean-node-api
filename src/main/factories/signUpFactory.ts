import { join } from 'path'

import { Controller } from '../../presentation/protocols'
import { SignUpController } from '../../presentation/controllers/SignUpController'
import { BcryptEncryptAdapter } from '../../infra/Cryptography/BcryptEncrypterAdapter'
import { DbAddAccountUseCase } from '../../data/useCases/AddAccount/DbAddAccountUseCase'
import { AccountMongoRepository } from '../../infra/db/mongodb/AccountRepository/AccountMongoRepository'
import { EmailValidatorAdapter } from '../../presentation/utils/EmailValidatorAdapter/EmailValidatorAdapter'
import { LoggerControllerDecorator } from '../decorators/LoggerControllerDecorator/LoggerControllerDecorator'
import { RequiredFieldsValidatorAdapter } from '../../presentation/utils/RequiredFieldsValidatorAdapter/RequiredFieldsValidatorAdapter'
import { DbVerifyAccountExists } from '../../data/useCases/VerifyAccountExists/DbVerifyAccountExists'

const signUpFactory = (): Controller => {
  const accountRepository = new AccountMongoRepository()

  const addAccount = new DbAddAccountUseCase(
    new BcryptEncryptAdapter(12),
    accountRepository
  )
  const verifyAccountExists = new DbVerifyAccountExists(
    accountRepository
  )
  const requiredFieldsValidator = new RequiredFieldsValidatorAdapter(
    ['email', 'name', 'password', 'passwordConfirmation']
  )
  const emailValidator = new EmailValidatorAdapter()
  const filePath = join(__dirname, '..', '..', '..', '..', 'log')

  const signUpController = new SignUpController(
    addAccount,
    emailValidator,
    requiredFieldsValidator,
    verifyAccountExists
  )

  return new LoggerControllerDecorator(
    signUpController,
    filePath
  )
}

export { signUpFactory }
