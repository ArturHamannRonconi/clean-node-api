import { Guid } from '../../../domain/protocols/Guid'
import { ReaderAuthentication } from '../../protocols/providers/ReaderAuthentication'
import { ConfirmAccessTokenRequestDTO } from '../../../domain/useCases/ConfirmAccessTokenUseCase'
import { DbConfirmAccessTokenUseCase } from './DbConfirmAccessTokenUseCase'

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
  readerAuthentication: ReaderAuthentication
  sut: DbConfirmAccessTokenUseCase

}

const makeSUT = (): SutTypes => {
  const readerAuthentication = makeFakeReaderAuthentication()
  const sut = new DbConfirmAccessTokenUseCase(
    readerAuthentication
  )

  return {
    sut,
    readerAuthentication
  }
}

describe('Db Confirm Access Token Use Case', () => {
  it('Should be able to call', async () => {
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
})
