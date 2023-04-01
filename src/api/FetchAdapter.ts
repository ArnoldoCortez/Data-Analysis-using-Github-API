import type CustomHttpClient from './CustomHttpClient'
import type CustomHttpRequest from './CustomHttpRequest'
import CustomHttpResponse from './CustomHttpResponse'

class FetchAdapter implements CustomHttpClient {
  public async get<Data>(customHttpRequest: CustomHttpRequest): Promise<CustomHttpResponse<Data>> {
    const response = await fetch(customHttpRequest.path)
    const data = await response.json()

    return new CustomHttpResponse(data, response.status)
  }
}

export default FetchAdapter
