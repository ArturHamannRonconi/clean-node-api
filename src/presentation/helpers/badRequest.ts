import HttpStatus from '../protocols/HttpStatus'

const badRequest = (err: Error): HttpStatus => ({
  statusCode: 400,
  body: err
})

export default badRequest
