import CssBaseline from '@mui/material/CssBaseline'
import Navbar from './components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

function App(): JSX.Element {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
