import { Guid } from '../../../../domain/protocols/Guid'

interface AddSurveyResultRequest {
  surveyId: Guid
  answer: string
  accountId: Guid
}

export { AddSurveyResultRequest }
