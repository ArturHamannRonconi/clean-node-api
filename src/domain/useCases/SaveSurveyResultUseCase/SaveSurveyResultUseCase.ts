import { SaveSurveyResultRequestDTO, SaveSurveyResultResponseDTO } from '.'

interface SaveSurveyResultUseCase {
  save: (surveyResult: SaveSurveyResultRequestDTO) => Promise<SaveSurveyResultResponseDTO>
}

export { SaveSurveyResultUseCase }
