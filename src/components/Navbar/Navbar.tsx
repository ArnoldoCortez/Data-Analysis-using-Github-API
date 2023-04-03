import { useEffect, useState } from 'react'
import { BiMenuAltRight } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import './navbar.scss'

function Navbar(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false)
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })
  useEffect(() => {
    const handleResize = (): void => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false)
    }
  }, [size.width, menuOpen])

  const menuToggleHandler = (): void => {
    setMenuOpen((p) => !p)
  }

  return (
    <header className='header'>
      <div className='header__content'>
        <nav
          className={`${'header__content__nav'}
          ${menuOpen && size.width < 768 ? `${'isMenu'}` : ''}
          }`}
        >
          <ul>
            <li>
              <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : '')}>
                Top 20 Repositories
              </NavLink>
            </li>
            <li>
              <NavLink to='/react-commits' className={({ isActive }) => (isActive ? 'active' : '')}>
                React Commit Activity
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className='header__content__toggle'>
          {!menuOpen ? <BiMenuAltRight onClick={menuToggleHandler} /> : <AiOutlineClose onClick={menuToggleHandler} />}
        </div>
      </div>
    </header>
  )
}

export default Navbar
