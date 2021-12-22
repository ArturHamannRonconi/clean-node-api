import { Account } from '../../../../domain/models'
import { AddAccountRequestDTO } from '../../../../domain/useCases/AddAccountUseCase'

interface AddAccountRepository {
  add: (addAccount: AddAccountRequestDTO) => Promise<Account>
}

export { AddAccountRepository }
