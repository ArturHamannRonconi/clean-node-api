import { Account } from '../../../domain/models'
import { AddAccount, AddAccountDTO } from '../../../domain/useCases'
import { AddAccountRepository } from '../../protocols/AddAccountRepository'
import { Encrypter } from '../../protocols/Encrypter'

class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly dbAddAccountRepository: AddAccountRepository
  ) { }

  async add (accountData: AddAccountDTO): Promise<Account> {
    const passwordHashed = await this
      .encrypter.encrypt(accountData.password)

    await this.dbAddAccountRepository.add({
      ...accountData, password: passwordHashed
    })

    return await new Promise(resolve => resolve(null))
  }
}

export { DbAddAccount }
