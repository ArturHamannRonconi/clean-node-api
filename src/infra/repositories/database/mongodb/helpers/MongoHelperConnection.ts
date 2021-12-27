import { Collection, MongoClient, WithId, Document } from 'mongodb'
import { Entity } from '../../../../../domain/models'
import { Guid } from '../../../../../domain/protocols/Guid'

class MongoHelperConnection {
  private static client: MongoClient
  private static url: string

  static async connect (url: string): Promise<void> {
    this.url = url
    if (!this.client)
      this.client = await MongoClient.connect(url)
  }

  static async disconnect (): Promise<void> {
    if (this.client !== null) {
      await this.client.close()
      this.client = null
    }
  }

  static async getCollection (collectionName: string): Promise<Collection> {
    await this.connect(this.url)
    return this.client.db()
      .collection(collectionName)
  }

  static map <T extends Entity> (document: WithId<Document>): T {
    const { _id, ...doc } = document

    const id = _id.toString() as Guid
    const entity = doc as T

    return { id, ...entity }
  }
}

export { MongoHelperConnection }
