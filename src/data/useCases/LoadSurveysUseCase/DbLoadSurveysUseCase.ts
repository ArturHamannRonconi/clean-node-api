import { LoadSurveysResponseDTO, LoadSurveysUseCase } from '../../../domain/useCases/LoadSurveysUseCase'
import { FindSurveyRepository } from '../../protocols/repositories/SurveyRepository/FindSurveyRepository'

class DbLoadSurveysUseCase implements LoadSurveysUseCase {
  constructor (
    private readonly findSurveyRepository: FindSurveyRepository
  ) {}

  async load (): Promise<LoadSurveysResponseDTO> {
    await this.findSurveyRepository.all()
    return null
  }
}

export { DbLoadSurveysUseCase }
