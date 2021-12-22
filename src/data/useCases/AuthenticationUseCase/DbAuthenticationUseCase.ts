import { AuthenticationRequestDTO, AuthenticationResponseDTO, AuthenticationUseCase } from '../../../domain/useCases/AuthenticationUseCase'
import { Encrypter, FindAccountRepository, Authenticate } from '../../protocols'
import { UpdateTokenRepository } from '../../protocols/repositories/TokenRepository/UpdateTokenRepository'

class DbAuthenticationUseCase implements AuthenticationUseCase {
  constructor (
    private readonly findAccountRepository: FindAccountRepository,
    private readonly encrypter: Encrypter,
    private readonly authenticateWithAccessToken: Authenticate,
    private readonly updateTokenRepository: UpdateTokenRepository
  ) { }

  async auth ({ email, password }: AuthenticationRequestDTO): Promise<AuthenticationResponseDTO> {
    const account = await this
      .findAccountRepository.byEmail(email)
    if (!account) return null

    const correctPassword = await this.encrypter
      .compare(password, account.password)
    if (!correctPassword) return null

    const accessToken = await this.authenticateWithAccessToken.auth(account.id)
    if (!accessToken) return null

    await this.updateTokenRepository
      .byId(account.id, accessToken)

    return { accessToken }
  }
}

export { DbAuthenticationUseCase }
