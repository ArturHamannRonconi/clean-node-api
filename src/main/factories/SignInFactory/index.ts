import { join } from 'path'
import { DbAuthenticationUseCase } from '../../../data/useCases/AuthenticationUseCase/DbAuthenticationUseCase'
import { AuthenticateJWTAdapter } from '../../../infra/Authentication/AuthenticateJWTAdapter'
import { BcryptEncryptAdapter } from '../../../infra/Cryptography/BcryptEncrypterAdapter'
import { AccountMongoRepository } from '../../../infra/database/mongodb/AccountRepository/AccountMongoRepository'
import { TokenMongoRepository } from '../../../infra/database/mongodb/TokenRepository/TokenMongoRepository'
import { FileSystemLoggerRepository } from '../../../infra/fileSystem/LoggerRepository/FileSystemLoggerRepository'
import { RequiredFieldsValidatorAdapter } from '../../../infra/validators/RequiredFieldsValidatorAdapter/RequiredFieldsValidatorAdapter'
import { ValidationComposite } from '../../../infra/validators/ValidationComposite/ValidationComposite'
import { SignInController } from '../../../presentation/controllers/SignInController'
import { SignInHttpRequestBody } from '../../../presentation/controllers/SignInController/SignInHttpRequestBody'
import { Controller } from '../../../presentation/protocols'
import { LoggerControllerDecorator } from '../../decorators/LoggerControllerDecorator/LoggerControllerDecorator'

const signInFacotry = (): Controller<SignInHttpRequestBody> => {
  const { JWT_SECRET, JWT_EXPIRES, SALT } = process.env

  const validation = new ValidationComposite([
    new RequiredFieldsValidatorAdapter(['email', 'password'])
  ])

  const accountRepository = new AccountMongoRepository()
  const encrypter = new BcryptEncryptAdapter(Number(SALT))
  const authenticate = new AuthenticateJWTAdapter(
    JWT_SECRET,
    JWT_EXPIRES
  )
  const tokenRepository = new TokenMongoRepository()

  const authenticationUseCase = new DbAuthenticationUseCase(
    accountRepository,
    encrypter,
    authenticate,
    tokenRepository
  )
  const signInController = new SignInController(
    validation,
    authenticationUseCase
  )
  const fileName = join(__dirname, '..', '..', '..', '..', 'log')
  const loggerRepository = new FileSystemLoggerRepository(fileName)

  return new LoggerControllerDecorator<SignInHttpRequestBody>(
    signInController,
    loggerRepository
  )
}

export { signInFacotry }
