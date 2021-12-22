import { TokenMongoRepository } from '../../../infra/repositories/database/mongodb/TokenRepository/TokenMongoRepository'

const tokenRepositoryFactory = (): TokenMongoRepository => new TokenMongoRepository()

export { tokenRepositoryFactory }
