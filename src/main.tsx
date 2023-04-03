import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

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
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <RepositoriesData />,
      },
      {
        path: 'react-commits',
        element: <ReactRepositoryData />,
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
