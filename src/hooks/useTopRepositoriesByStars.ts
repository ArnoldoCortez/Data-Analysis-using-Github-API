import { useState } from 'react'
import { useQuery } from 'react-query'

import repositoriesService from '../api/RepositoriesService'
import type { LanguageFilter as languageFilterType } from '../types/languageFilter.types'
import { languageFilter as languageFilterConst } from '../constants/languageFilter.constants'

export function useTopRepositoriesByStars() {
  const [languageFilter, setLanguageFilter] = useState<languageFilterType>(languageFilterConst.ALL)
  const { data, isLoading, error, isError } = useQuery(
    ['repositories', languageFilter],
    async () => await repositoriesService.getTopRepositoriesByStars({ languageFilter }),
    {
      staleTime: 60000,
      useErrorBoundary: true,
    }
  )
  return { data, isLoading, error, isError, languageFilter, setLanguageFilter }
}
