import { Account } from '../../../domain/models'
import { AddAccountRequestDTO, AddAccountUseCase } from '../../../domain/useCases'
import { AddAccountRepository } from '../../protocols/AddAccountRepository'
import { Encrypter } from '../../protocols/Encrypter'
import { DbAddAccountUseCase } from './DbAddAccountUseCase'

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (addAccount: AddAccountRequestDTO): Promise<Account> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password'
      }

      return await new Promise(resolve => resolve(fakeAccount))
    }
  }

  return new AddAccountRepositoryStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}

interface SutTypes {
  sut: AddAccountUseCase
  encryptStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSUT = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const encryptStub = makeEncrypter()
  const sut = new DbAddAccountUseCase(
    encryptStub,
    addAccountRepositoryStub
  )

  return {
    sut,
    encryptStub,
    addAccountRepositoryStub
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

    const addAccount = sut.add(accountData)
    await expect(addAccount).rejects.toThrow()
  })

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSUT()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      ...accountData,
      password: 'hashed_password'
    })
  })

  it('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSUT()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    const addAccount = sut.add(accountData)
    await expect(addAccount).rejects.toThrow()
  })

  it('Should be able to return a Account', async () => {
    const { sut } = makeSUT()

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    const account = await sut.add(accountData)
    expect(account).toHaveProperty('id')
  })
})
