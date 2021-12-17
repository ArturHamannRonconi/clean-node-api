import { VerifyAccountExistsRequestDTO } from './VerifyAccountExistsRequestDTO'

interface VerifyAccountExistsUseCase {
  verify: (account: VerifyAccountExistsRequestDTO) => Promise<boolean>
}

export { VerifyAccountExistsUseCase }
