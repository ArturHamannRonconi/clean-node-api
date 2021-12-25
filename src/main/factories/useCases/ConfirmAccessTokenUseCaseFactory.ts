import { DbConfirmAccessTokenUseCase } from '../../../data/useCases/ConfirmAccessTokenUseCase/DbConfirmAccessTokenUseCase'
import { ConfirmAccessTokenUseCase } from '../../../domain/useCases/ConfirmAccessTokenUseCase'
import { authenticateFactory } from '../providers/AuthenticateFactory'
import { accountRepositoryFactory } from '../repositories/AccountRepositoryFactory'

const confirmAccessTokenUseCaseFactory = (): ConfirmAccessTokenUseCase => {
  const authenticate = authenticateFactory()
  const findAccountRepository = accountRepositoryFactory()
  return new DbConfirmAccessTokenUseCase(
    authenticate,
    findAccountRepository
  )
}

export { confirmAccessTokenUseCaseFactory }
