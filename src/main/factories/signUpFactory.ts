import { DbAddAccountUseCase } from '../../data/useCases/AddAccount/DbAddAccountUseCase'
import { BcryptEncryptAdapter } from '../../infra/Cryptography/BcryptEncrypterAdapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/AccountRepository/AccountMongoRepository'
import { SignUpController } from '../../presentation/controllers/SignUpController'
import { EmailValidatorAdapter } from '../../presentation/utils/EmailValidatorAdapter'

const signUpFactory = (): SignUpController => {
  const addAccount = new DbAddAccountUseCase(
    new BcryptEncryptAdapter(12),
    new AccountMongoRepository()
  )

  const emailValidator = new EmailValidatorAdapter()

  return new SignUpController(
    addAccount,
    emailValidator
  )
}

export { signUpFactory }
