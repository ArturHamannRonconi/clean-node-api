import { AddSurveyRequestDTO } from './AddSurveyRequestDTO'

interface AddSurveyUseCase {
  add: (survey: AddSurveyRequestDTO) => Promise<boolean>
}

export { AddSurveyUseCase }
