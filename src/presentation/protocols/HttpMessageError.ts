enum StatusCode {
  BAD_REQUEST=400
}

interface HttpMessageError {
  statusCode: StatusCode
  body: any
}

export { StatusCode }
export default HttpMessageError
