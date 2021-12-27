import { LoadSurveyByIdRequestDTO, LoadSurveyByIdResponseDTO } from '.'

interface LoadSurveyByIdUseCase {
  load: (surveyBox: LoadSurveyByIdRequestDTO) => Promise<LoadSurveyByIdResponseDTO>
}

export { LoadSurveyByIdUseCase }
