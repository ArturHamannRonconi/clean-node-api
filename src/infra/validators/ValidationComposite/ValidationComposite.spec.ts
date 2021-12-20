import { Json } from '../../../presentation/protocols/http'
import { Validation } from '../../../presentation/protocols/validators'
import { ValidationComposite } from './ValidationComposite'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    async validate (input: Json): Promise<Error> {
      return null
    }
  }

  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validations: Validation[]
}

const makeSUT = (): SutTypes => {
  const validation = makeValidation()
  const validations = [validation]

  const sut = new ValidationComposite(validations)
  return { sut, validations }
}

describe('Validation Composite', () => {
  it('Should be able to return an error if on validation are return error', async () => {
    const { sut, validations } = makeSUT()
    const result = new Error()

    jest
      .spyOn(validations[0], 'validate')
      .mockReturnValueOnce(new Promise(
        resolve => resolve(result)
      ))

    const error = await sut.validate({ })
    expect(error).toEqual(result)
  })

  it('Should be able to return null if an validation are return null', async () => {
    const { sut } = makeSUT()
    const nullable = await sut.validate({ })
    expect(nullable).toBeNull()
  })
})
