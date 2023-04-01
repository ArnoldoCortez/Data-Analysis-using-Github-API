class CustomHttpResponse<Data = unknown> {
  constructor(public data: Data, public status: number) {
    this.status = status
    this.data = data
  }
}
export default CustomHttpResponse
