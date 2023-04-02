import { useQuery } from 'react-query'

import repositoriesService from '../api/RepositoriesService'

export function useReactWeeklyCommitActivity() {
  const { data, isLoading, error, isError } = useQuery(
    ['react-commits'],
    async () => await repositoriesService.getReactWeeklyCommitActivity(),
    {
      staleTime: 60000,
      useErrorBoundary: true,
    }
  )
  return { data, isLoading, error, isError }
}
