import React, { useState, useEffect } from 'react'
import './navbar.css'
import Button from './Button'
import { CircleUserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const navigate = useNavigate()

  const checkLoginStatus = () => {
    const user = localStorage.getItem('user')

    if (user) {
      const parsedUser = JSON.parse(user)
      const token = parsedUser.token || null

      if (token) {
        setUser(parsedUser)
      } else {
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    checkLoginStatus()
  }, [])

  const handleLogout = async () => {
    try {
      localStorage.removeItem('user')

      document.cookie =
        'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

      setUser(null)
      setDropdownVisible(false)

      navigate('/')
      window.location.reload()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="nav-logo">LOGO</div>
          <div className="nav-item">
            <Button text="Chat" targetId="chat" />
            <Button text="Articles" targetId="articles" />
            <Button text="Trade" targetId="trade" />
            <button
              className="nav-button"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              <CircleUserRound />
              Account
            </button>
            {dropdownVisible && (
              <div className="dropdown-menu">
                {user ? (
                  <>
                    <button onClick={() => navigate('/my-trades')}>
                      My Trades
                    </button>
                    <button onClick={() => navigate('/my-products')}>
                      My Products
                    </button>
                    <button onClick={() => navigate('/my-articles')}>
                      My Articles
                    </button>
                    <button onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/register')}>
                      Register
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar
