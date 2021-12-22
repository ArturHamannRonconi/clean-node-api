import { DbAddAccountUseCase } from '../../../data/useCases/AddAccount/DbAddAccountUseCase'
import { AddAccountUseCase } from '../../../domain/useCases/AddAccountUseCase'
import { accountRepositoryFactory } from '../repositories/AccountRepositoryFactory'
import { encrypterFactory } from '../providers/EncrypterFactory'

const addUseCaseFactory = (): AddAccountUseCase => {
  return new DbAddAccountUseCase(
    encrypterFactory(),
    accountRepositoryFactory()
  )
}

export { addUseCaseFactory }
