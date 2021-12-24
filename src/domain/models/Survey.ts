import { Entity } from '.'

interface Answer {
  readonly image?: string
  readonly answer: string
}

interface Survey extends Entity {
  readonly question: string
  readonly answers: Answer[]
}

export { Survey, Answer }
