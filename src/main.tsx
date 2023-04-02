import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import './index.scss'
import RepositoriesData from './pages/RepositoriesData'
import ReactRepositoryData from './pages/ReactRepositoryData'
import ErrorPage from './pages/ErrorPage'
import App from './App'

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
