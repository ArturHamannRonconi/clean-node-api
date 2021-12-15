import { AddAccountDTO } from '.'
import { Account } from '../models/Account'

interface AddAccount {
  add: (account: AddAccountDTO) => Promise<Account>
}

export { AddAccount }
