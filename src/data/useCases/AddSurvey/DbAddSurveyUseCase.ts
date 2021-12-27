import { Role } from '../../../domain/protocols/Role'
import { AddSurveyRequestDTO, AddSurveyUseCase } from '../../../domain/useCases/AddSurveyUseCase'
import { AddSurveyRepository } from '../../protocols/repositories/SurveyRepository/AddSurveyRepository'

class DbAddSurveyUseCase implements AddSurveyUseCase {
  constructor (
    private readonly addSurveyRepository: AddSurveyRepository
  ) {}

  async add ({ answers, question, role, accountId }: AddSurveyRequestDTO): Promise<boolean> {
    if (role !== Role.ADMIN) return false

    await this.addSurveyRepository.add({
      answers, question, ownerId: accountId
    })

    return true
  }
}

export { DbAddSurveyUseCase }
