import { Account } from '../../../domain/models'
import { VerifyAccountExistsRequestDTO, VerifyAccountExistsUseCase } from '../../../domain/useCases/VerifyAccountExistsUseCase'
import { FindAccountRepository } from '../../protocols'

class DbVerifyAccountExists implements VerifyAccountExistsUseCase {
  constructor (
    private readonly findAccountRepository: FindAccountRepository
  ) { }

  async verify (account: VerifyAccountExistsRequestDTO): Promise<boolean> {
    const [accountByEmail] = await this.findByAll(account)

    return !!accountByEmail
  }

  async findByAll ({ email }: VerifyAccountExistsRequestDTO): Promise<Account[]> {
    return await Promise.all([
      this.findAccountRepository.byEmail(email)
    ])
  }
}

export { DbVerifyAccountExists }
