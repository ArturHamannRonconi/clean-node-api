import { Guid } from '../../protocols/Guid'

interface SaveSurveyResultRequestDTO {
  readonly surveyId: Guid
  readonly accountId: Guid
  readonly answer: string
}

export { SaveSurveyResultRequestDTO }
