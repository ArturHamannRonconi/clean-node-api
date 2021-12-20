import { AuthenticationRequestDTO, AuthenticationResponseDTO, AuthenticationUseCase } from '../../../domain/useCases/AuthenticationUseCase'
import { Encrypter, FindAccountRepository } from '../../protocols'
import { Authenticate } from '../../protocols/Authenticate'

class DbAuthenticationUseCase implements AuthenticationUseCase {
  constructor (
    private readonly findAccountRepository: FindAccountRepository,
    private readonly encrypter: Encrypter,
    private readonly authenticate: Authenticate
  ) { }

  async auth ({ email, password }: AuthenticationRequestDTO): Promise<AuthenticationResponseDTO> {
    const account = await this
      .findAccountRepository.byEmail(email)
    if (!account) return null

    const correctPassword = await this.encrypter
      .compare(password, account.password)
    if (!correctPassword) return null

    const tokens = await this.authenticate.auth(account.id)
    if (!tokens) return null
  }
}

export { DbAuthenticationUseCase }
