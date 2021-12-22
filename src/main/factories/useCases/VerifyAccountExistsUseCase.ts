import { DbVerifyAccountExists } from '../../../data/useCases/VerifyAccountExists/DbVerifyAccountExists'
import { VerifyAccountExistsUseCase } from '../../../domain/useCases/VerifyAccountExistsUseCase'
import { accountRepositoryFactory } from '../repositories/AccountRepositoryFactory'

const verifyAccountExistsUseCaseFactory = (): VerifyAccountExistsUseCase =>
  new DbVerifyAccountExists(accountRepositoryFactory())

export { verifyAccountExistsUseCaseFactory }
