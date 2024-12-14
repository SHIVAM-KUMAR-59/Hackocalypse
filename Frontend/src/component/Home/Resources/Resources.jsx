import React from 'react'
import './resources.css'
import Card1 from './Card1'
import Card2 from './Card2'
import Card3 from './Card3'

const Resources = () => {
  return (
    <div className="resources-section">
      <div className="resources-one">
        <Card1 />
        <Card2 />
      </div>
      <Card3 />
    </div>
  )
}

export default Resources
