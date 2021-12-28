import { Guid } from '../../../../domain/protocols/Guid'

interface SaveSurveuResultRepositoryRequestDTO {
  readonly surveyId: Guid
  readonly accountId: Guid
  readonly answer: string
}

export { SaveSurveuResultRepositoryRequestDTO }
