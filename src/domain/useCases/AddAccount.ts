import { AddAccountModel } from '.'
import { AccountModel } from '../models/AccountModel'

interface AddAccount {
  add: (account: AddAccountModel) => AccountModel
}

export { AddAccount }
