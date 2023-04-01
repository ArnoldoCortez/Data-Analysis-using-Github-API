import type CustomHttpRequest from './CustomHttpRequest'
import type CustomHttpResponse from './CustomHttpResponse'

interface CustomHttpClient {
  get: <Data>(httpCustomRequest: CustomHttpRequest) => Promise<CustomHttpResponse<Data>>
}

export default CustomHttpClient
