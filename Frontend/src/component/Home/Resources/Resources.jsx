import React from 'react'
import './resources.css'
import Card1 from './Card1'
import Card2 from './Card2'

const Resources = () => {
  return (
    <div className="resources-section">
      <div className="resources-one">
        <Card1 />
        <Card2 />
      </div>
      <div className="resource-two">Important Resources</div>
    </div>
  )
}

export default Resources
