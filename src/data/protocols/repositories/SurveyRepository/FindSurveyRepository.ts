import { Survey } from '../../../../domain/models'
import { Guid } from '../../../../domain/protocols/Guid'

interface FindSurveyRepository {
  all: () => Promise<Survey[]>
  byId: (surveyId: Guid) => Promise<Survey>
}

export { FindSurveyRepository }
