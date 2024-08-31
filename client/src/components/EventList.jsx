import React, { useState } from 'react'
import useFetchEvents from './useFetchEvents'
import Container from './Container'
import Search from './Search'
import List from './List'
import LoginForm from './LoginForm'

function isTokenValid() {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Math.floor(Date.now() / 1000)
    return decodedToken.exp > currentTime
  } catch (e) {
    return false
  }
}

function EventList() {
  const [searchTitle, setSearchTitle] = useState('')
  const [category, setCategory] = useState('All')
  const { events, error } = useFetchEvents(searchTitle, category)

  return (
    <Container>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Events
      </h1>
      <LoginForm isTokenValid={isTokenValid} />
      <Search
        setCategory={setCategory}
        setSearchTitle={setSearchTitle}
        searchTitle={searchTitle}
        category={category}
      />
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <List events={events} />
    </Container>
  )
}

export default EventList
