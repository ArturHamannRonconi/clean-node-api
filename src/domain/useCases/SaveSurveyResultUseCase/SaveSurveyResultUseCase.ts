import { SaveSurveyResultRequestDTO } from '.'

interface SaveSurveyResultUseCase {
  save: (surveyResult: SaveSurveyResultRequestDTO) => Promise<void>
}

export { SaveSurveyResultUseCase }
