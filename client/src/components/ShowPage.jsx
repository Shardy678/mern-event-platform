import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CircleIcon from '@mui/icons-material/Circle'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function EventShowPage() {
  const { id } = useParams() // Get the event ID from the URL
  const [event, setEvent] = useState(null)
  const [coordinates, setCoordinates] = useState(null)

  useEffect(() => {
    // Fetch the event details from the API
    async function fetchEvent() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/${id}`
        )
        setEvent(response.data)
        // Fetch coordinates based on location
        fetchCoordinates(response.data.location)
      } catch (error) {
        console.error('Error fetching event:', error)
      }
    }
    fetchEvent()
  }, [id])

  const fetchCoordinates = async (address) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`,
        {
          params: {
            access_token:
              'pk.eyJ1Ijoic2hhcmR5eGQiLCJhIjoiY2x6bWV1bmJ5MGRmaTJscXc2OGduZWhwOSJ9.GLONmYX5DBVMQsoG4qmryA',
          },
        }
      )
      const [lng, lat] = response.data.features[0].geometry.coordinates
      setCoordinates({ lat, lng })
    } catch (error) {
      console.error('Error fetching coordinates:', error)
    }
  }

  useEffect(() => {
    if (coordinates) {
      mapboxgl.accessToken =
        'pk.eyJ1Ijoic2hhcmR5eGQiLCJhIjoiY2x6bWV1bmJ5MGRmaTJscXc2OGduZWhwOSJ9.GLONmYX5DBVMQsoG4qmryA'
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [coordinates.lng, coordinates.lat],
        zoom: 12,
      })

      new mapboxgl.Marker()
        .setLngLat([coordinates.lng, coordinates.lat])
        .addTo(map)
    }
  }, [coordinates])

  if (!event) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap pt-14 px-4">
        <div className="w-full md:w-1/2 lg:w-1/2 mb-4">
          <img
            className="object-cover rounded-lg w-full h-96"
            src={event.image}
            alt={event.title}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col p-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{event.title}</h1>
          <p className="text-lg sm:text-xl mb-2">
            <CalendarMonthIcon sx={{ paddingRight: '2px', color: 'gray' }} />
            {event.date}
            <CircleIcon
              sx={{ fontSize: '0.5rem', color: 'gray', marginX: '4px' }}
            />
            {event.time}
          </p>
          <p className="text-lg sm:text-xl mb-4 text-gray-600">
            {event.location}
          </p>
          <p className="text-base sm:text-lg">{event.description}</p>
        </div>
        <div id="map" className="w-full h-96 mt-4 rounded-lg"></div>
      </div>
    </div>
  )
}
