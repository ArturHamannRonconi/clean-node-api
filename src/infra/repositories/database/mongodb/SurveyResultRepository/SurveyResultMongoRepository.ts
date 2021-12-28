import { SaveSurveyResultRepository } from '../../../../../data/protocols/repositories/SurveyResultRepository/SaveSurveyResultRepository'
import { SaveSurveuResultRepositoryRequestDTO } from '../../../../../data/protocols/repositories/SurveyResultRepository/SaveSurveyResultRepositoryRequestDTO'
import { Guid } from '../../../../../domain/protocols/Guid'
import { MongoHelperConnection } from '../helpers/MongoHelperConnection'

class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save ({ accountId, answer, surveyId }: SaveSurveuResultRepositoryRequestDTO): Promise<Guid> {
    const surveysResultsCollection = await MongoHelperConnection
      .getCollection('surveysResults')

    const { value: survey } = await surveysResultsCollection.findOneAndUpdate(
      { surveyId, accountId },
      { $set: { answer } },
      { upsert: true, returnDocument: 'after' }
    )

    return survey._id.toString()
  }
}

export { SurveyResultMongoRepository }
