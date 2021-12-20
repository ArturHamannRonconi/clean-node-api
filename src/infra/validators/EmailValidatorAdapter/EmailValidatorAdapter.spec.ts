import validator from 'validator'
import { InvalidParamError } from '../../../presentation/utils/errors'

import { EmailValidatorAdapter } from './EmailValidatorAdapter'

jest.mock('validator', () => ({
  isEmail: (): boolean => {
    return true
  }
}))

const makeSUT = (): EmailValidatorAdapter => new EmailValidatorAdapter()

describe('Email Validator Adapter', () => {
  it('Should return an error if validator return false', () => {
    const sut = makeSUT()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const emailIsValid = sut.isValid('invalid_email@mail.com')

    expect(emailIsValid).toEqual(new InvalidParamError('email'))
  })

  it('Should retur true if validator return true', () => {
    const sut = makeSUT()
    const emailIsValid = sut.isValid('valid_email@mail.com')

    expect(emailIsValid).toEqual(null)
  })

  it('Should calls validator with the correct email', () => {
    const sut = makeSUT()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')

    const email = 'valid_email@mail.com'
    sut.isValid(email)

    expect(isEmailSpy).toHaveBeenCalledWith(email)
  })
})
