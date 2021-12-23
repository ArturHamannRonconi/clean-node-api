import { Guid } from '../../../domain/protocols/Guid'
import { DbConfirmAccessTokenUseCase } from './DbConfirmAccessTokenUseCase'
import { ReaderAuthentication } from '../../protocols/providers/ReaderAuthentication'
import { ConfirmAccessTokenRequestDTO } from '../../../domain/useCases/ConfirmAccessTokenUseCase'
import { FindAccountRepository } from '../../protocols/repositories/AccountRepository/FindAccountRepository'
import { Account } from '../../../domain/models'

const makeFakeAccount = (): Account => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

const makeFakeFindAccountRepository = (): FindAccountRepository => {
  class FindAccountRepositoryStub implements FindAccountRepository {
    async byId (id: string): Promise<Account> {
      return await new Promise(
        resolve => resolve(makeFakeAccount())
      )
    }

    async byEmail (email: string): Promise<Account> {
      return await new Promise(
        resolve => resolve(makeFakeAccount())
      )
    }
  }

  return new FindAccountRepositoryStub()
}

const makeFakeReaderAuthentication = (): ReaderAuthentication => {
  class ReaderAuthenticationStub implements ReaderAuthentication {
    async readAccessToken (accessToken: string): Promise<Guid> {
      return await new Promise(
        resolve => resolve('any_id')
      )
    }
  }

  return new ReaderAuthenticationStub()
}

const makeFakeAuthorization = (): ConfirmAccessTokenRequestDTO => ({
  authorization: 'any_token'
})

interface SutTypes {
  sut: DbConfirmAccessTokenUseCase
  readerAuthentication: ReaderAuthentication
  findAccountRepository: FindAccountRepository
}

const makeSUT = (): SutTypes => {
  const findAccountRepository = makeFakeFindAccountRepository()
  const readerAuthentication = makeFakeReaderAuthentication()
  const sut = new DbConfirmAccessTokenUseCase(
    readerAuthentication,
    findAccountRepository
  )

  return {
    sut,
    readerAuthentication,
    findAccountRepository
  }
}

describe('Db Confirm Access Token Use Case', () => {
  it('Should be able to call ReaderAuthentication', async () => {
    const { sut, readerAuthentication } = makeSUT()
    const readSpy = jest.spyOn(readerAuthentication, 'readAccessToken')
    const confirmation = makeFakeAuthorization()

    await sut.confirm(confirmation)
    expect(readSpy).toHaveBeenCalledWith(
      confirmation.authorization
    )
  })

  it('Should be able to throws if ReaderAuthentication throws', async () => {
    const { sut, readerAuthentication } = makeSUT()
    jest
      .spyOn(readerAuthentication, 'readAccessToken')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

    const error = sut.confirm(makeFakeAuthorization())
    await expect(error).rejects.toThrow()
  })

  it('Should be able to return null if ReaderAuthentication returns null', async () => {
    const { sut, readerAuthentication } = makeSUT()
    jest
      .spyOn(readerAuthentication, 'readAccessToken')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => resolve(null))
      )

    const nullable = await sut.confirm(makeFakeAuthorization())
    expect(nullable).toBeNull()
  })

  it('Should be able to call FindAccountRepository', async () => {
    const { sut, findAccountRepository } = makeSUT()
    const byIdSpy = jest.spyOn(findAccountRepository, 'byId')
    const confirmation = makeFakeAuthorization()

    await sut.confirm(confirmation)
    expect(byIdSpy).toHaveBeenCalledWith('any_id')
  })
})
