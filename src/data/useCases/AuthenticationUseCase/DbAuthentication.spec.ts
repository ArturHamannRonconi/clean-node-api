import { Account } from '../../../domain/models'
import { Guid } from '../../../domain/protocols/Guid'
import { Tokens } from '../../protocols/Authenticate/Tokens'
import { DbAuthenticationUseCase } from './DbAuthenticationUseCase'
import { Encrypter, FindAccountRepository, Authenticate, UpdateTokenRepository } from '../../protocols'
import { AuthenticationRequestDTO, AuthenticationUseCase } from '../../../domain/useCases/AuthenticationUseCase'

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

const makeFakeToken = (): Tokens => ({
  accessToken: 'any_token'
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

const makeAuthenticate = (): Authenticate => {
  class AuthenticateStub implements Authenticate {
    async auth (id: Guid): Promise<Tokens> {
      return makeFakeToken()
    }
  }

  return new AuthenticateStub()
}

const makeUpdateAccessTokenRepository = (): UpdateTokenRepository => {
  class UpdateTokenRepositoryStub implements UpdateTokenRepository {
    async byId (id: Guid, token: string): Promise<void> {

    }
  }

  return new UpdateTokenRepositoryStub()
}

interface SutTypes {
  sut: AuthenticationUseCase
  findAccountRepository: FindAccountRepository
  encrypter: Encrypter
  authenticate: Authenticate
  updateTokenRepository: UpdateTokenRepository
}

const makeSUT = (): SutTypes => {
  const findAccountRepository = makeFindAccountRepository()
  const encrypter = makeEncrypter()
  const authenticate = makeAuthenticate()
  const updateTokenRepository = makeUpdateAccessTokenRepository()

  const sut = new DbAuthenticationUseCase(
    findAccountRepository,
    encrypter,
    authenticate,
    updateTokenRepository
  )

  return {
    sut,
    findAccountRepository,
    encrypter,
    authenticate,
    updateTokenRepository
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

  it('Should throw if Encrypter throws', async () => {
    const { sut, encrypter } = makeSUT()
    const login = makeFakeLogin()
    jest
      .spyOn(encrypter, 'compare')
      .mockImplementation(() => { throw new Error() })

    const error = sut.auth(login)
    await expect(error).rejects.toThrow()
  })

  it('Should return null if Encrypter retur null', async () => {
    const { sut, encrypter } = makeSUT()
    const login = makeFakeLogin()
    jest
      .spyOn(encrypter, 'compare')
      .mockReturnValueOnce(
        new Promise(resolve => resolve(null))
      )

    const tokens = await sut.auth(login)
    expect(tokens).toBeNull()
  })

  it('Should call Authenticate with correct values', async () => {
    const { sut, authenticate } = makeSUT()
    const authSpy = jest.spyOn(authenticate, 'auth')

    await sut.auth(makeFakeLogin())
    expect(authSpy)
      .toHaveBeenCalledWith(makeFakeAccount().id)
  })

  it('Should throw if Authenticate throws', async () => {
    const { sut, authenticate } = makeSUT()
    const login = makeFakeLogin()
    jest
      .spyOn(authenticate, 'auth')
      .mockImplementation(() => { throw new Error() })

    const error = sut.auth(login)
    await expect(error).rejects.toThrow()
  })

  it('Should return null if Authenticate retur null', async () => {
    const { sut, authenticate } = makeSUT()
    const login = makeFakeLogin()
    jest
      .spyOn(authenticate, 'auth')
      .mockReturnValueOnce(
        new Promise(resolve => resolve(null))
      )

    const tokens = await sut.auth(login)
    expect(tokens).toBeNull()
  })

  it('Should call UpdateAccessTokenRepository with correct value', async () => {
    const { sut, updateTokenRepository } = makeSUT()
    const account = makeFakeAccount()
    const updateAccessTokenRepositorySpy = jest
      .spyOn(updateTokenRepository, 'byId')

    await sut.auth(makeFakeLogin())
    expect(updateAccessTokenRepositorySpy)
      .toHaveBeenCalledWith(
        account.id,
        makeFakeToken().accessToken
      )
  })

  it('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateTokenRepository } = makeSUT()
    const login = makeFakeLogin()
    jest
      .spyOn(updateTokenRepository, 'byId')
      .mockImplementation(() => { throw new Error() })

    const error = sut.auth(login)
    await expect(error).rejects.toThrow()
  })

  it('Should be able to return the tokens if everything works out', async () => {
    const { sut } = makeSUT()
    const login = makeFakeLogin()
    const tokens = await sut.auth(login)

    expect(tokens).toHaveProperty(
      'accessToken',
      makeFakeToken().accessToken
    )
  })
})
