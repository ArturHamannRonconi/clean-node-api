import { AddSurveyRequestDTO } from './AddSurveyRequestDTO'

interface AddSurveyUseCase {
  add: (survey: AddSurveyRequestDTO) => Promise<void>
}

export { AddSurveyUseCase }
