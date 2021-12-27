import { Survey } from '../../../../../domain/models'
import { MongoHelperConnection } from '../helpers/MongoHelperConnection'
import { AddSurveyRepository, AddSurveyRepositoryRequestDTO } from '../../../../../data/protocols/repositories/SurveyRepository'
import { FindSurveyRepository } from '../../../../../data/protocols/repositories/SurveyRepository/FindSurveyRepository'

class SurveyMongoRepository implements AddSurveyRepository, FindSurveyRepository {
  async all (): Promise<Survey[]> {
    const surveysCollection = await MongoHelperConnection
      .getCollection('surveys')

    const surveys = await surveysCollection
      .find()
      .map(survey => MongoHelperConnection.map<Survey>(survey))
      .toArray()

    return surveys
  }

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
