import { ConfirmAccessTokenRequestDTO, ConfirmAccessTokenResponseDTO, ConfirmAccessTokenUseCase } from '../../../domain/useCases/ConfirmAccessTokenUseCase'
import { FindAccountRepository } from '../../protocols'
import { ReaderAuthentication } from '../../protocols/providers/ReaderAuthentication'

class DbConfirmAccessTokenUseCase implements ConfirmAccessTokenUseCase {
  constructor (
    private readonly readerAuthentication: ReaderAuthentication,
    private readonly findAccountRepository: FindAccountRepository
  ) {}

  async confirm ({ authorization }: ConfirmAccessTokenRequestDTO): Promise<ConfirmAccessTokenResponseDTO> {
    const [hashType, token] = authorization.split(' ')
    if (hashType !== 'Bearer') return null

    const accountId = await this.readerAuthentication
      .readAccessToken(token)
    if (!accountId) return null

    const account = await this.findAccountRepository
      .byId(accountId as string)
    if (!account) return null
  }
}

export { DbConfirmAccessTokenUseCase }
