import { Encrypter } from '../../../data/protocols'
import { compare, hash } from 'bcryptjs'

class BcryptEncryptAdapter implements Encrypter {
  constructor (
    private readonly salt: number
  ) { }

  async compare (value: string, hash: string): Promise<boolean> {
    return await compare(value, hash)
  }

  async encrypt (value: string): Promise<string> {
    return await hash(value, this.salt)
  }
}

export { BcryptEncryptAdapter }
