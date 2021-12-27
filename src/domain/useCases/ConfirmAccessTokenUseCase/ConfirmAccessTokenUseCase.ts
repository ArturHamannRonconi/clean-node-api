import { ConfirmAccessTokenResponseDTO, ConfirmAccessTokenRequestDTO } from '.'

interface ConfirmAccessTokenUseCase {
  confirm: (confirmationData: ConfirmAccessTokenRequestDTO) => Promise<ConfirmAccessTokenResponseDTO>
}

export { ConfirmAccessTokenUseCase }
