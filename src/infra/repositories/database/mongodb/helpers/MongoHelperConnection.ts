import { Collection, MongoClient } from 'mongodb'

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
}

export { MongoHelperConnection }
