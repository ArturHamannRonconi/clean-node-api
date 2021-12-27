import { Answer } from '../../../../domain/models/Survey'
import { Guid } from '../../../../domain/protocols/Guid'
import { Role } from '../../../../domain/protocols/Role'

interface AddSurveyHttpRequestBody {
  readonly accountId: Guid
  readonly role: Role
  readonly question: string
  readonly answers: Answer[]
}

export { AddSurveyHttpRequestBody }
