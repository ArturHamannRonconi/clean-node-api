import { LoadSurveyByIdRequestDTO, LoadSurveyByIdResponseDTO, LoadSurveyByIdUseCase } from '../../../domain/useCases/LoadSurveyByIdUseCase'
import { FindSurveyRepository } from '../../protocols/repositories/SurveyRepository/FindSurveyRepository'

class DbLoadSurveyByIdUseCase implements LoadSurveyByIdUseCase {
  constructor (
    private readonly findSurveyRepository: FindSurveyRepository
  ) {}

  async load ({ surveyId }: LoadSurveyByIdRequestDTO): Promise<LoadSurveyByIdResponseDTO> {
    const surveyExists = await this.findSurveyRepository.byId(surveyId)

    if (!surveyExists) return null

    return { survey: surveyExists }
  }
}

export { DbLoadSurveyByIdUseCase }
