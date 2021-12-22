import { AccountMongoRepository } from '../../../infra/repositories/database/mongodb/AccountRepository/AccountMongoRepository'

const accountRepositoryFactory = (): AccountMongoRepository => new AccountMongoRepository()

export { accountRepositoryFactory }
