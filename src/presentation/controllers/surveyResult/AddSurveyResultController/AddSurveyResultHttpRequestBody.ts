import { Guid } from '../../../../domain/protocols/Guid'

interface AddSurveyResultHttpRequestBody {
  answer: string
  accountId: Guid
}

export { AddSurveyResultHttpRequestBody }
