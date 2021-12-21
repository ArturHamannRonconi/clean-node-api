import { join } from 'path'

import { Controller } from '../../../presentation/protocols'
import { SignUpController } from '../../../presentation/controllers/SignUpController'
import { BcryptEncryptAdapter } from '../../../infra/Cryptography/BcryptEncrypterAdapter'
import { DbAddAccountUseCase } from '../../../data/useCases/AddAccount/DbAddAccountUseCase'
import { ValidationComposite } from '../../../infra/validators/ValidationComposite/ValidationComposite'
import { DbVerifyAccountExists } from '../../../data/useCases/VerifyAccountExists/DbVerifyAccountExists'
import { EmailValidatorAdapter } from '../../../infra/validators/EmailValidatorAdapter/EmailValidatorAdapter'
import { SignUpHttpRequestBody } from '../../../presentation/controllers/SignUpController/SignUpHttpRequestBody'
import { LoggerControllerDecorator } from '../../decorators/LoggerControllerDecorator/LoggerControllerDecorator'
import { AccountMongoRepository } from '../../../infra/database/mongodb/AccountRepository/AccountMongoRepository'
import { FileSystemLoggerRepository } from '../../../infra/fileSystem/LoggerRepository/FileSystemLoggerRepository'
import { RequiredFieldsValidatorAdapter } from '../../../infra/validators/RequiredFieldsValidatorAdapter/RequiredFieldsValidatorAdapter'

const signUpFactory = (): Controller<SignUpHttpRequestBody> => {
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
  const validationComposite = new ValidationComposite([
    requiredFieldsValidator,
    emailValidator
  ])

  const filePath = join(__dirname, '..', '..', '..', '..', 'log')
  const loggerRepository = new FileSystemLoggerRepository(filePath)

  const signUpController = new SignUpController(
    addAccount,
    verifyAccountExists,
    validationComposite
  )

  return new LoggerControllerDecorator<SignUpHttpRequestBody>(
    signUpController,
    loggerRepository
  )
}

export { signUpFactory }
