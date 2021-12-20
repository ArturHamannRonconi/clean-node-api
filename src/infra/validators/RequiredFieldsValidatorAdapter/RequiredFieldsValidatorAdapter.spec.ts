import { MissingParamError } from '../../../presentation/utils/errors'
import { RequiredFieldsValidatorAdapter } from './RequiredFieldsValidatorAdapter'

interface SutTypes {
  sut: RequiredFieldsValidatorAdapter
}

const makeSUT = (): SutTypes => {
  const sut = new RequiredFieldsValidatorAdapter(
    ['test', 'ok']
  )

  return { sut }
}

describe('Required fields validator', () => {
  it('Should be able to return MissingParamError if has not param', async () => {
    const { sut } = makeSUT()
    const body = { ok: 'not ok' }

    const error = await sut.validate(body)
    expect(error).toEqual(new MissingParamError('test'))
  })

  it('Should be able to return null if has all params', async () => {
    const { sut } = makeSUT()
    const body = { ok: 'ok', test: 'test' }

    const error = await sut.validate(body)
    expect(error).toEqual(null)
  })
})
