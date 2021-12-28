import { Survey } from '../../../../../domain/models'
import { MongoHelperConnection } from '../helpers/MongoHelperConnection'
import { AddSurveyRepository, AddSurveyRepositoryRequestDTO } from '../../../../../data/protocols/repositories/SurveyRepository'
import { FindSurveyRepository } from '../../../../../data/protocols/repositories/SurveyRepository/FindSurveyRepository'
import { Guid } from '../../../../../domain/protocols/Guid'
import { ObjectId } from 'mongodb'

class SurveyMongoRepository implements AddSurveyRepository, FindSurveyRepository {
  async byId (surveyId: Guid): Promise<Survey> {
    const surveysCollection = await MongoHelperConnection
      .getCollection('surveys')

    const survey = await surveysCollection
      .findOne(new ObjectId(surveyId))

    return MongoHelperConnection.map<Survey>(survey)
  }

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
