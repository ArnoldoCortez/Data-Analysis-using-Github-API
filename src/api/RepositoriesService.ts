import CustomHttpRequest from './CustomHttpRequest'
import type CustomHttpResponse from './CustomHttpResponse'
import type CustomHttpClient from './CustomHttpClient'
import { languageFilter as languageFilterConst } from '../constants/languageFilter.constants'
import type { RepositoriesSearch } from '../types/repository.types'
import type { LanguageFilter } from '../types/languageFilter.types'

const PUBLIC_URL = 'https://api.github.com'

class RepositoriesService {
  constructor(private readonly customHttpAdapter: CustomHttpClient) {}

  public async getTopRepositoriesByStars({
    languageFilter = languageFilterConst.ALL,
  }: {
    languageFilter?: LanguageFilter
  }): Promise<CustomHttpResponse<RepositoriesSearch>> {
    const languageQuery = languageFilter === languageFilterConst.ALL ? '' : ` language:${languageFilter}`
    const searchParams = new URLSearchParams({
      q: `stars:>1000${languageQuery}`,
      sort: 'stars',
      order: 'desc',
      per_page: '20',
      page: '1',
    }).toString()
    const customHttpResponse = this.customHttpAdapter.get<RepositoriesSearch>(
      new CustomHttpRequest(`${PUBLIC_URL}/search/repositories?${searchParams}`)
    )
    return await customHttpResponse
  }

  public async getReactWeeklyCommitActivity(): Promise<CustomHttpResponse> {
    const customHttpResponse = this.customHttpAdapter.get(
      new CustomHttpRequest(`${PUBLIC_URL}/repos/facebook/react/stats/commit_activity`)
    )
    return await customHttpResponse
  }
}

export default RepositoriesService
