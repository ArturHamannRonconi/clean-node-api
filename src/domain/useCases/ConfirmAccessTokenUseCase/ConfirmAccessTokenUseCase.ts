import { ConfirmAccessTokenResponseDTO, ConfirmAccessTokenRequestDTO } from '.'

interface ConfirmAccessTokenUseCase {
  confirm: (accessToken: ConfirmAccessTokenRequestDTO) => Promise<ConfirmAccessTokenResponseDTO>
}

export { ConfirmAccessTokenUseCase }
