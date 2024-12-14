import React from 'react'
import './navbar.css'
import Button from './Button'
import { CircleUserRound } from 'lucide-react'

const Navbar = () => {
  return (
    <>
      <header>
        <nav className="navbar">
          <div className="nav-logo">LOGO</div>
          <div className="nav-item">
            <Button text="About" />
            <Button text="Contact" />
            <Button text="Contact" />
            <Button text="Contact" />
            <button className="nav-button">
              <CircleUserRound />
              Account
            </button>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar
