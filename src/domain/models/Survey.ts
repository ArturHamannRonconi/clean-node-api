import { Entity } from '.'
import { Guid } from '../protocols/Guid'

interface Answer {
  readonly image?: string
  readonly answer: string
}

interface Survey extends Entity {
  readonly ownerId: Guid
  readonly question: string
  readonly answers: Answer[]
}

export { Survey, Answer }
