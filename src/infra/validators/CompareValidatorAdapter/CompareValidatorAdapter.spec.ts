import { CompareValidator } from '../../../presentation/protocols/validators/CompareValidator'
import { CompareError } from '../../../presentation/utils/errors'
import { CompareValidatorAdapter } from '.'

const makeSUT = (): CompareValidator => new CompareValidatorAdapter()

describe('Compare Validator Adapter', () => {
  it('Should be able to return an Error if comparation is incorrect', async () => {
    const sut = makeSUT()
    const err = await sut.validate({
      password: 'any_password',
      passwordConfirmation: 'any_password_2'
    })

    expect(err).toEqual(new CompareError())
  })

  it('Should be able to return null if comparation is correct', () => {
    const sut = makeSUT()
    const nullValue = sut.compare({
      compared: 'any_password',
      comparable: 'any_password'
    })

    expect(nullValue).toBeNull()
  })
})
