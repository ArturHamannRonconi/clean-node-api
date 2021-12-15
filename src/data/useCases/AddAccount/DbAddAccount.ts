import { AccountModel } from '../../../domain/models'
import { AddAccount, AddAccountModel } from '../../../domain/useCases'
import { Encrypter } from '../../protocols/Encrypter'

class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter
  ) { }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return await new Promise(resolve => resolve(null))
  }
}

export { DbAddAccount }
