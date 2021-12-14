import { AddAccountModel } from '.'
import { AccountModel } from '../models/AccountModel'

interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}

export { AddAccount }
