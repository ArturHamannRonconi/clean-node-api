import { LoadSurveyByIdRequestDTO, LoadSurveyByIdResponseDTO, LoadSurveyByIdUseCase } from '../../../domain/useCases/LoadSurveyByIdUseCase'
import { FindSurveyRepository } from '../../protocols/repositories/SurveyRepository/FindSurveyRepository'

class DbLoadSurveyByIdUseCase implements LoadSurveyByIdUseCase {
  constructor (
    private readonly findSurveyRepository: FindSurveyRepository
  ) {}

  async load ({ surveyId }: LoadSurveyByIdRequestDTO): Promise<LoadSurveyByIdResponseDTO> {
    await this.findSurveyRepository.byId(surveyId)
    return null
  }
}

export { DbLoadSurveyByIdUseCase }
