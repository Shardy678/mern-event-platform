import React from 'react'

function Container({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex items-center justify-center">
        <div className="container mx-auto p-8">{children}</div>
      </div>
    </div>
  )
}

export default Container
