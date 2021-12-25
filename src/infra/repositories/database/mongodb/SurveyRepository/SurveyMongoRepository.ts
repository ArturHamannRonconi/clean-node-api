import { Survey } from '../../../../../domain/models'
import { MongoHelperConnection } from '../helpers/MongoHelperConnection'
import { AddSurveyRepository, AddSurveyRepositoryRequestDTO } from '../../../../../data/protocols/repositories/SurveyRepository'

class SurveyMongoRepository implements AddSurveyRepository {
  async add (survey: AddSurveyRepositoryRequestDTO): Promise<Survey> {
    const surveysCollection = await MongoHelperConnection
      .getCollection('surveys')

    const { insertedId } = await surveysCollection.insertOne(survey)

    return {
      ...survey,
      id: insertedId.toString()
    }
  }
}

export { SurveyMongoRepository }
