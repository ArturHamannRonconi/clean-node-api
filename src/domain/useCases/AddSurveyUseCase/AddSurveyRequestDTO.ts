import { Answer } from '../../models/Survey'

interface AddSurveyRequestDTO {
  readonly question: string
  readonly answers: Answer[]
}

export { AddSurveyRequestDTO }
