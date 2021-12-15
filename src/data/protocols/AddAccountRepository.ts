import { Account } from '../../domain/models'
import { AddAccountDTO } from '../../domain/useCases'

interface AddAccountRepository {
  add: (addAccount: AddAccountDTO) => Promise<Account>
}

export { AddAccountRepository }
