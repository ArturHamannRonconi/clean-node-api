import { DbAuthenticationUseCase } from '../../../data/useCases/AuthenticationUseCase/DbAuthenticationUseCase'
import { AuthenticationUseCase } from '../../../domain/useCases/AuthenticationUseCase'
import { accountRepositoryFactory } from '../repositories/AccountRepositoryFactory'
import { authenticateFactory } from '../providers/AuthenticateFactory'
import { encrypterFactory } from '../providers/EncrypterFactory'
import { tokenRepositoryFactory } from '../repositories/TokenRepositoryFactory'

const dbAuthenticationUseCaseFactory = (): AuthenticationUseCase => {
  const accountRepository = accountRepositoryFactory()
  return new DbAuthenticationUseCase(
    accountRepository,
    encrypterFactory(),
    authenticateFactory(),
    tokenRepositoryFactory()
  )
}

export { dbAuthenticationUseCaseFactory }
