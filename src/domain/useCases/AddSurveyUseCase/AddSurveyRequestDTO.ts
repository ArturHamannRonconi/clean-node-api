import { Answer } from '../../models/Survey'
import { Guid } from '../../protocols/Guid'
import { Role } from '../../protocols/Role'

interface AddSurveyRequestDTO {
  readonly accountId: Guid
  readonly role: Role
  readonly question: string
  readonly answers: Answer[]
}

export { AddSurveyRequestDTO }
