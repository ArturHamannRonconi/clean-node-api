import { Account } from '../../../domain/models'
import { AddAccount, AddAccountDTO } from '../../../domain/useCases'
import { Encrypter } from '../../protocols/Encrypter'

class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter
  ) { }

  async add (account: AddAccountDTO): Promise<Account> {
    await this.encrypter.encrypt(account.password)
    return await new Promise(resolve => resolve(null))
  }
}

export { DbAddAccount }
