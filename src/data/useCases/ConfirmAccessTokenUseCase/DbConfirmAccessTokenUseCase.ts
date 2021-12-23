import { ConfirmAccessTokenRequestDTO, ConfirmAccessTokenResponseDTO, ConfirmAccessTokenUseCase } from '../../../domain/useCases/ConfirmAccessTokenUseCase'
import { ReaderAuthentication } from '../../protocols/providers/ReaderAuthentication'

class DbConfirmAccessTokenUseCase implements ConfirmAccessTokenUseCase {
  constructor (
    private readonly readerAuthentication: ReaderAuthentication
  ) {}

  async confirm ({ authorization }: ConfirmAccessTokenRequestDTO): Promise<ConfirmAccessTokenResponseDTO> {
    const accountId = await this.readerAuthentication.readAccessToken(authorization)
    if (!accountId) return null
  }
}

export { DbConfirmAccessTokenUseCase }
