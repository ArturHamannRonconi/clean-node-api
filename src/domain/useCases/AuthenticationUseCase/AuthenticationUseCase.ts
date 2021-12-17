import { AuthenticationRequestDTO, AuthenticationResponseDTO } from '.'

interface AuthenticationUseCase {
  auth: (authentication: AuthenticationRequestDTO) => Promise<AuthenticationResponseDTO>
}

export { AuthenticationUseCase }
