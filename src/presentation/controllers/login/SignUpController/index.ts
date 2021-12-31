import { AccountAlreadyExistsError } from '../../../utils/errors'
import { badRequest, serverError, created, conflict } from '../../../utils/http'

import { AddAccountUseCase } from '../../../../domain/useCases/AddAccountUseCase'
import { VerifyAccountExistsUseCase } from '../../../../domain/useCases/VerifyAccountExistsUseCase'

import { SignUpRequest } from './SignUpRequest'
import { Controller } from '../../../protocols/Controller'

import { Validation } from '../../../protocols/validators'
import { HttpResponse } from '../../../protocols/http'
import { Role } from '../../../../domain/protocols/Role'

class SignUpController implements Controller<SignUpRequest> {
  constructor (
    private readonly addAccountUseCase: AddAccountUseCase,
    private readonly verifyAccountExistsUseCase: VerifyAccountExistsUseCase,
    private readonly validation: Validation
  ) { }

  async handle (request: SignUpRequest): Promise<HttpResponse> {
    try {
      const { email, password, name } = request

      const error = await this.validation.validate(request)
      if (error) return badRequest(error)

      const accountAlreadyExists = await this
        .verifyAccountExistsUseCase
        .verify({ email })

      if (accountAlreadyExists)
        return conflict(new AccountAlreadyExistsError())

      await this.addAccountUseCase
        .add({ email, name, password, role: Role.NORMAL })

      return created()
    } catch (error) {
      return serverError(error.message)
    }
  }
}

export { SignUpController }
