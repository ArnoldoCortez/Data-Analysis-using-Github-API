import { useEffect } from 'react'
import './App.css'
import SearchRepositoriesService from './api/SearchRepositoriesService'
import FetchAdapter from './api/FetchAdapter'

function App(): JSX.Element {
  useEffect(() => {
    const searchRepositoriesService = new SearchRepositoriesService(new FetchAdapter())

    searchRepositoriesService
      .getTopRepositoriesByStars({})
      .then((response) => {
        const data = response.data
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return <div className='App'>Hello World!!</div>
}

export default App
