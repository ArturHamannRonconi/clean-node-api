import { AuthenticationRequestDTO, AuthenticationResponseDTO, AuthenticationUseCase } from '../../../domain/useCases/AuthenticationUseCase'
import { FindAccountRepository } from '../../protocols'

class DbAuthenticationUseCase implements AuthenticationUseCase {
  constructor (
    private readonly findAccountRepository: FindAccountRepository
  ) { }

  async auth ({ email, password }: AuthenticationRequestDTO): Promise<AuthenticationResponseDTO> {
    await this.findAccountRepository.byEmail(email)
    return null
  }
}

export { DbAuthenticationUseCase }
