import { Account } from '../../../domain/models'
import { AddAccountRequestDTO, AddAccountUseCase } from '../../../domain/useCases'
import { AddAccountRepository } from '../../protocols/AddAccountRepository'
import { Encrypter } from '../../protocols/Encrypter'

class DbAddAccountUseCase implements AddAccountUseCase {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly dbAddAccountRepository: AddAccountRepository
  ) { }

  async add (accountData: AddAccountRequestDTO): Promise<Account> {
    const passwordHashed = await this
      .encrypter.encrypt(accountData.password)

    const account = await this.dbAddAccountRepository.add({
      ...accountData, password: passwordHashed
    })

    return account
  }
}

export { DbAddAccountUseCase }