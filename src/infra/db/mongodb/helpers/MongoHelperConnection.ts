import { Collection, MongoClient } from 'mongodb'

class MongoHelperConnection {
  private static client: MongoClient

  static async connect (url: string): Promise<void> {
    if (this.client !== null)
      this.client = await MongoClient.connect(url)
  }

  static async disconnect (): Promise<void> {
    if (this.client !== null)
      await this.client.close()
  }

  static getCollection (collectionName: string): Collection {
    return this.client.db().collection(collectionName)
  }
}

export { MongoHelperConnection }
