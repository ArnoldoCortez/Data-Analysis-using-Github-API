import type CustomHttpClient from './CustomHttpClient'
import type CustomHttpRequest from './CustomHttpRequest'
import CustomHttpResponse from './CustomHttpResponse'

class FetchAdapter implements CustomHttpClient {
  public async get<Data>(customHttpRequest: CustomHttpRequest): Promise<CustomHttpResponse<Data>> {
    let response: Response

    try {
      response = await fetch(customHttpRequest.path)
    } catch (error) {
      throw new Error('Sorry, there was an unexpecteted server error')
    }

    if (!response.ok) {
      throw new Error(`Sorry there was a ${response.status} error`)
    }

    const data = await response.json()

    return new CustomHttpResponse(data, response.status)
  }
}

export default FetchAdapter
