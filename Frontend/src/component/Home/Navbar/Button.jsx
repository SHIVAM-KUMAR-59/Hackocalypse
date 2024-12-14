import React from 'react'

const Button = (props) => {
  const handleScroll = () => {
    const section = document.getElementById(props.targetId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' }) // Smoothly scroll to the section
    } else {
      // Navigate to the provided route if the section is not found
      window.location.href = `/${props.targetId}`
    }
  }

  return (
    <button className="nav-button" onClick={handleScroll}>
      {props.text}
    </button>
  )
}

export default Button
