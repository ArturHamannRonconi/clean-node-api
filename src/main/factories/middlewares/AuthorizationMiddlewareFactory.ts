import { AuthorizationMiddleware } from '../../../presentation/middlewares/AuthorizationMiddleware/AuthorizationMiddleware'
import { Middleware } from '../../../presentation/protocols/Middleware'
import { confirmAccessTokenUseCaseFactory } from '../useCases/ConfirmAccessTokenUseCaseFactory'

const AuthorizationMiddlewareFactory = (): Middleware => {
  const confirmAccessTokenUseCase = confirmAccessTokenUseCaseFactory()

  return new AuthorizationMiddleware(confirmAccessTokenUseCase)
}

export { AuthorizationMiddlewareFactory }
