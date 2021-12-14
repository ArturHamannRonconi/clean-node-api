class ServerError extends Error {
  constructor () {
    super('Server side error')
    Object.setPrototypeOf(this, ServerError.prototype)
    this.name = 'ServerError'
  }
}

export { ServerError }
