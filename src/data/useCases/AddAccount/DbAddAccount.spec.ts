import { Encrypter } from '../../protocols/Encrypter'
import { DbAddAccount } from './DbAddAccount'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}

interface SutTypes {
  sut: DbAddAccount
  encryptStub: Encrypter
}

const makeSUT = (): SutTypes => {
  const encryptStub = makeEncrypter()
  const sut = new DbAddAccount(encryptStub)
  return {
    sut,
    encryptStub
  }
}

describe('DbAddAccount UseCase', () => {
  it('Should call Hash with correct password', async () => {
    const { sut, encryptStub } = makeSUT()
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password)
  })

  it('Should throw if Encrypter throws', async () => {
    const { sut, encryptStub } = makeSUT()
    jest.spyOn(encryptStub, 'encrypt').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    const addAccountModel = sut.add(accountData)
    await expect(addAccountModel).rejects.toThrow()
  })
})
