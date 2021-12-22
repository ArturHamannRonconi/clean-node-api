import { BcryptEncryptAdapter } from '../../../infra/providers/Cryptography/BcryptEncrypterAdapter'
import { Encrypter } from '../../../data/protocols'

const { SALT } = process.env
const encrypterFactory = (): Encrypter => new BcryptEncryptAdapter(Number(SALT))

export { encrypterFactory }
