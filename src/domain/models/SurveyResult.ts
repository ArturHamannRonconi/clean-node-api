import { Entity } from '.'
import { Guid } from '../protocols/Guid'

interface SurveyResult extends Entity {
  surveyId: Guid
  accountId: Guid
  answer: string
}

export { SurveyResult }
