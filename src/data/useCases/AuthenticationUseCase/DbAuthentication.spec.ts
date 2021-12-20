import { Account } from '../../../domain/models'
import { AuthenticationRequestDTO, AuthenticationUseCase } from '../../../domain/useCases/AuthenticationUseCase'
import { Encrypter, FindAccountRepository } from '../../protocols'
import { DbAuthenticationUseCase } from './DbAuthenticationUseCase'

const makeFakeLogin = (): AuthenticationRequestDTO => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeFakeAccount = (): Account => ({
  name: 'any_name',
  id: 'any_id',
  password: 'any_hash',
  email: makeFakeLogin().email
})

const makeFindAccountRepository = (): FindAccountRepository => {
  class FindAccountRepositoryStub implements FindAccountRepository {
    async byEmail (email: string): Promise<Account> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new FindAccountRepositoryStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return 'any_hash'
    }

    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }

  return new EncrypterStub()
}

interface SutTypes {
  sut: AuthenticationUseCase
  findAccountRepository: FindAccountRepository
  encrypter: Encrypter
}

const makeSUT = (): SutTypes => {
  const findAccountRepository = makeFindAccountRepository()
  const encrypter = makeEncrypter()

  const sut = new DbAuthenticationUseCase(
    findAccountRepository,
    encrypter
  )

  return {
    sut,
    findAccountRepository,
    encrypter
  }
}

describe('Db Authentication Use Case', () => {
  it('Should call FindAccountRepository with correct value', async () => {
    const { sut, findAccountRepository } = makeSUT()
    const login = makeFakeLogin()
    const findAccountRepoSpy = jest
      .spyOn(findAccountRepository, 'byEmail')

    await sut.auth(login)
    expect(findAccountRepoSpy)
      .toHaveBeenCalledWith(login.email)
  })

  it('Should throw if FindAccountRepository throws', async () => {
    const { sut, findAccountRepository } = makeSUT()
    const login = makeFakeLogin()
    jest
      .spyOn(findAccountRepository, 'byEmail')
      .mockImplementation(() => { throw new Error() })

    const error = sut.auth(login)
    await expect(error).rejects.toThrow()
  })

  it('Should return null if FindAccountRepository retur null', async () => {
    const { sut, findAccountRepository } = makeSUT()
    const login = makeFakeLogin()
    jest
      .spyOn(findAccountRepository, 'byEmail')
      .mockReturnValueOnce(
        new Promise(resolve => resolve(null))
      )

    const tokens = await sut.auth(login)
    expect(tokens).toBeNull()
  })

  it('Should call compare in Encrypter with correct value', async () => {
    const { sut, encrypter } = makeSUT()
    const compareSpy = jest.spyOn(encrypter, 'compare')
    const login = makeFakeLogin()
    const account = makeFakeAccount()

    await sut.auth(login)
    expect(compareSpy).toHaveBeenCalledWith(
      login.password,
      account.password
    )
  })
})
