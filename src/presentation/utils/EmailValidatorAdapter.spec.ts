import validator from 'validator'

import { EmailValidatorAdapter } from './EmailValidatorAdapter'

jest.mock('validator', () => ({
  isEmail: (): boolean => {
    return true
  }
}))

describe('Email Validator Adapter', () => {
  it('Should retur false if validator return false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const emailIsValid = sut.isValid('invalid_email@mail.com')

    expect(emailIsValid).toBe(false)
  })

  it('Should retur true if validator return true', () => {
    const sut = new EmailValidatorAdapter()
    const emailIsValid = sut.isValid('valid_email@mail.com')

    expect(emailIsValid).toBe(true)
  })
})
