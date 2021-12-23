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
})
