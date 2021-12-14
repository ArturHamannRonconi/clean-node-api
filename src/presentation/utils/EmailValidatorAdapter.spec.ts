import { EmailValidatorAdapter } from './EmailValidatorAdapter'

describe('Email Validator Adapter', () => {
  it('Should retur false if validator return false', () => {
    const sut = new EmailValidatorAdapter()
    const emailIsValid = sut.isValid('invalid_email@mail.com')

    expect(emailIsValid).toBe(false)
  })
})
