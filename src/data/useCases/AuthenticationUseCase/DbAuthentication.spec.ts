import { Account } from '../../../domain/models'
import { AuthenticationUseCase } from '../../../domain/useCases/AuthenticationUseCase'
import { FindAccountRepository } from '../../protocols'
import { DbAuthenticationUseCase } from './DbAuthenticationUseCase'

const makeFindAccountRepository = (): FindAccountRepository => {
  class FindAccountRepositoryStub implements FindAccountRepository {
    async byEmail (email: string): Promise<Account> {
      return await new Promise(resolve => resolve({
        name: 'any_name',
        id: 'any_id',
        password: 'any_password',
        email
      }))
    }
  }

  return new FindAccountRepositoryStub()
}

interface SutTypes {
  sut: AuthenticationUseCase
  findAccountRepository: FindAccountRepository
}

const makeSUT = (): SutTypes => {
  const findAccountRepository = makeFindAccountRepository()
  const sut = new DbAuthenticationUseCase(
    findAccountRepository
  )

  return {
    sut,
    findAccountRepository
  }
}

describe('Db Authentication Use Case', () => {
  it('Should call FindAccountRepository with correct value', async () => {
    const { sut, findAccountRepository } = makeSUT()
    const findAccountRepoSpy = jest
      .spyOn(findAccountRepository, 'byEmail')

    const login = {
      email: 'any_email@mail.com',
      password: 'any_password'
    }

    await sut.auth(login)

    expect(findAccountRepoSpy)
      .toHaveBeenCalledWith(login.email)
  })

  it('', async () => {

  })
})
