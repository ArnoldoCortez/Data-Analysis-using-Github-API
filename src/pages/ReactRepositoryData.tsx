import { useQuery } from 'react-query'
import { Box, Container, Skeleton } from '@mui/material'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

import RepositoriesService from '../api/RepositoriesService'
import FetchAdapter from '../api/FetchAdapter'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'React Repository Last 10 Weeks of Commit Activity',
    },
  },
}

const repositoriesService = new RepositoriesService(new FetchAdapter())

export default function ReactRepositoryData(): JSX.Element {
  const { isLoading, data } = useQuery(
    ['react-commits'],
    async () => await repositoriesService.getReactWeeklyCommitActivity(),
    {
      staleTime: 60000,
    }
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  const last10Weeks = data?.data.slice(-10)

  const chartData = {
    labels: last10Weeks.map((item) => new Date(item.week * 1000).toLocaleDateString()),
    datasets: [
      {
        label: 'Number of Commists',
        data: data?.data.map((item) => item.total),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return (
    <Container maxWidth='lg'>
      {isLoading ? (
        <Box sx={{ width: '100%', aspectRatio: '2 / 1' }}>
          <Skeleton variant='rectangular' sx={{ width: '100%', height: '100%' }} />
        </Box>
      ) : (
        <Box sx={{ width: '100%', aspectRatio: '2 / 1' }}>
          <Line options={options} data={chartData} />
        </Box>
      )}
    </Container>
  )
}
