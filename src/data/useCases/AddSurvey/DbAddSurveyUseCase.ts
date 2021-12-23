import { AddSurveyRequestDTO, AddSurveyUseCase } from '../../../domain/useCases/AddSurveyUseCase'
import { AddSurveyRepository } from '../../protocols/repositories/SurveyRepository/AddSurveyRepository'

class DbAddSurveyUseCase implements AddSurveyUseCase {
  constructor (
    private readonly addSurveyRepository: AddSurveyRepository
  ) {}

  async add (survey: AddSurveyRequestDTO): Promise<void> {
    await this.addSurveyRepository.add(survey)
  }
}

export { DbAddSurveyUseCase }
