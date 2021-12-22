import { Answer } from '../../../../domain/models/Survey'

interface AddSurveyHttpRequestBody {
  readonly question: string
  readonly answers: Answer[]
}

export { AddSurveyHttpRequestBody }
