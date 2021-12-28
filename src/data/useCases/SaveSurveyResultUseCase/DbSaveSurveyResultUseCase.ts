import { SaveSurveyResultRequestDTO, SaveSurveyResultUseCase, SaveSurveyResultResponseDTO } from '../../../domain/useCases/SaveSurveyResultUseCase'
import { SaveSurveyResultRepository } from '../../protocols/repositories/SurveyResultRepository/SaveSurveyResultRepository'

class DbSaveSurveyResultUseCase implements SaveSurveyResultUseCase {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save (surveyResult: SaveSurveyResultRequestDTO): Promise<SaveSurveyResultResponseDTO> {
    const surveyResultId = await this.saveSurveyResultRepository.save(surveyResult)

    if (!surveyResultId) return null

    return { surveyResultId }
  }
}

export { DbSaveSurveyResultUseCase }
