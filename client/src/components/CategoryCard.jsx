// CategoryCard.jsx
import React, { useState } from 'react'

const CategoryCard = ({ title, icon, isActive, onClick }) => {
  const [pressed, setPressed] = useState(isActive)

  const handleClick = () => {
    // Toggle the pressed state and invoke onClick callback
    setPressed(!pressed)
    onClick()
  }

  return (
    <div
      onClick={handleClick}
      className={`px-4 cursor-pointer ${pressed ? 'bg-gray-300' : 'bg-white'} ${isActive ? 'border-2 border-blue-500' : ''} shadow-lg rounded-lg overflow-hidden transform ${pressed ? 'scale-95' : 'scale-100'} transition-transform`}
    >
      <div className="p-4 flex items-center justify-center">
        <div className="text-3xl text-gray-600">{icon}</div>
      </div>
      <div className="p-4">
        <h2 className="text-center text-gray-800">{title}</h2>
      </div>
    </div>
  )
}

export default CategoryCard
