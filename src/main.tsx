import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CircularProgress } from '@mui/material'

import './index.scss'
import App from './App'

const RepositoriesData = lazy(async () => await import('./pages/RepositoriesData'))
const ReactRepositoryData = lazy(async () => await import('./pages/ReactRepositoryData'))
const ErrorPage = lazy(async () => await import('./pages/ErrorPage'))

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: (
      <Suspense fallback={<CircularProgress color='secondary' />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<CircularProgress color='secondary' />}>
            <RepositoriesData />,
          </Suspense>
        ),
      },
      {
        path: 'react-commits',
        element: (
          <Suspense fallback={<CircularProgress color='secondary' />}>
            <ReactRepositoryData />
          </Suspense>
        ),
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
