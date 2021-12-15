import { Router } from 'express'
import { SignUpControllerExpressdapter } from '../../../infra/router/express/SignUpControllerExpressAdapter'

const signUpRoutes = Router()

signUpRoutes.post('/sign-up', SignUpControllerExpressdapter.handle)

export { signUpRoutes }
