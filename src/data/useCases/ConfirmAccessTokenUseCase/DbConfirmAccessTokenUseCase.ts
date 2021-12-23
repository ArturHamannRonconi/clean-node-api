import { ConfirmAccessTokenRequestDTO, ConfirmAccessTokenResponseDTO, ConfirmAccessTokenUseCase } from '../../../domain/useCases/ConfirmAccessTokenUseCase'
import { ReaderAuthentication } from '../../protocols/providers/ReaderAuthentication'

class DbConfirmAccessTokenUseCase implements ConfirmAccessTokenUseCase {
  constructor (
    private readonly readerAuthentication: ReaderAuthentication
  ) {}

  async confirm ({ authorization }: ConfirmAccessTokenRequestDTO): Promise<ConfirmAccessTokenResponseDTO> {
    await this.readerAuthentication.readAccessToken(authorization)
    return null
  }
}

export { DbConfirmAccessTokenUseCase }
