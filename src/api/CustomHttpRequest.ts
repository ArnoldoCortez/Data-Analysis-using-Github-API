class CustomHttpRequest {
  constructor(public path: string, public params?: any) {
    this.path = path
    this.params = params
  }
}

export default CustomHttpRequest
