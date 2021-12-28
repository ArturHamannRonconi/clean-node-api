import { SaveSurveyResultRequestDTO, SaveSurveyResultUseCase, SaveSurveyResultResponseDTO } from '../../../domain/useCases/SaveSurveyResultUseCase'
import { SaveSurveyResultRepository } from '../../protocols/repositories/SurveyResultRepository/SaveSurveyResultRepository'

class DbSaveSurveyResultUseCase implements SaveSurveyResultUseCase {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save (surveyResult: SaveSurveyResultRequestDTO): Promise<SaveSurveyResultResponseDTO> {
    await this.saveSurveyResultRepository.save(surveyResult)
    return null
  }
}

export { DbSaveSurveyResultUseCase }
