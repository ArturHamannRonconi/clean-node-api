class MissingParamError extends Error {
  constructor (fieldName: string) {
    super(`Missing param: ${fieldName}`)
    Object.setPrototypeOf(this, MissingParamError.prototype)
    this.name = 'MissingParamError'
  }
}

export default MissingParamError
