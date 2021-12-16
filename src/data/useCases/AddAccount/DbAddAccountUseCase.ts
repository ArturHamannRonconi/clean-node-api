import { AddAccountRequestDTO, AddAccountResponseDTO, AddAccountUseCase } from '../../../domain/useCases'
import { Encrypter, AddAccountRepository } from '../../protocols'

class DbAddAccountUseCase implements AddAccountUseCase {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly dbAddAccountRepository: AddAccountRepository
  ) { }

  async add (accountData: AddAccountRequestDTO): Promise<AddAccountResponseDTO> {
    const passwordHashed = await this
      .encrypter.encrypt(accountData.password)

    const { password, ...account } = await this.dbAddAccountRepository.add({
      ...accountData, password: passwordHashed
    })

    return account
  }
}

export { DbAddAccountUseCase }
