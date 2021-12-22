import { Guid } from '../protocols/Guid'

interface Answer {
  readonly image: string
  readonly answer: string
}

interface Survey {
  readonly id: Guid
  readonly question: string
  readonly answers: Answer[]
}

export { Survey, Answer }
