import { Answer } from '../../../../domain/models'
import { Guid } from '../../../../domain/protocols/Guid'

interface AddSurveyRepositoryRequestDTO {
  readonly question: string
  readonly answers: Answer[]
  readonly ownerId: Guid
}

export { AddSurveyRepositoryRequestDTO }
