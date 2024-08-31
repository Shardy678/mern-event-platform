import { useState, useEffect } from 'react'
import axios from 'axios'

function useFetchEvents(searchTitle, category) {
  const [events, setEvents] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events', {
          params: { title: searchTitle, category: category },
        })
        setEvents(response.data.events)
        setError(null)
      } catch (error) {
        console.error('Error fetching events:', error)
        setError('Failed to fetch events. Please try again later.')
      }
    }

    fetchEvents()
  }, [searchTitle, category])

  return { events, error }
}

export default useFetchEvents
