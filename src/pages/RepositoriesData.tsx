import { useState } from 'react'
import { useQuery } from 'react-query'
import { Box, Tabs, Tab, Container, Skeleton } from '@mui/material'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

import RepositoriesService from '../api/RepositoriesService'
import FetchAdapter from '../api/FetchAdapter'
import type { LanguageFilter as languageFilterType } from '../types/languageFilter.types'
import { languageFilter as languageFilterConst } from '../constants/languageFilter.constants'

const repositoriesService = new RepositoriesService(new FetchAdapter())

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Top 20 Github Repositories',
    },
  },
}

export default function RepositoriesData(): JSX.Element {
  const [languageFilter, setLanguageFilter] = useState<languageFilterType>(languageFilterConst.ALL)
  const { isLoading, data } = useQuery(
    ['repositories', languageFilter],
    async () => await repositoriesService.getTopRepositoriesByStars({ languageFilter }),
    {
      staleTime: 60000,
    }
  )

  const chartData = {
    labels: data?.data.items.map((item) => item.full_name),
    datasets: [
      {
        label: 'Stars',
        data: data?.data.items.map((item) => item.stargazers_count),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  const handleChange = (event: React.SyntheticEvent, newValue: languageFilterType): void => {
    setLanguageFilter(newValue)
  }

  return (
    <Container maxWidth='lg'>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={languageFilter}
          onChange={handleChange}
          textColor='secondary'
          indicatorColor='secondary'
          aria-label='secondary tabs example'
        >
          <Tab value={languageFilterConst.ALL} label='All' />
          <Tab value={languageFilterConst.JAVASCRIPT} label='JavaScript' />
          <Tab value={languageFilterConst.GO} label='Go' />
          <Tab value={languageFilterConst.RUBY} label='Ruby' />
          <Tab value={languageFilterConst.PYTHON} label='Python' />
        </Tabs>
      </Box>
      {isLoading ? (
        <Box sx={{ width: '100%', aspectRatio: '2 / 1' }}>
          <Skeleton variant='rectangular' sx={{ width: '100%', height: '100%' }} />
        </Box>
      ) : (
        <Box sx={{ width: '100%', aspectRatio: '2 / 1' }}>
          <Bar options={options} data={chartData} />
        </Box>
      )}
    </Container>
  )
}
