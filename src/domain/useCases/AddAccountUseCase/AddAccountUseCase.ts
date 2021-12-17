import { AddAccountRequestDTO, AddAccountResponseDTO } from '.'

interface AddAccountUseCase {
  add: (account: AddAccountRequestDTO) => Promise<AddAccountResponseDTO>
}

export { AddAccountUseCase }
