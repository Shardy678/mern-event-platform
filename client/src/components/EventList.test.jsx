import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios'
import EventList from './EventList'

// Mock axios
jest.mock('axios')

// Mock localStorage and window.location
const localStorageMock = (function () {
  let store = {}
  return {
    getItem(key) {
      return store[key] || null
    },
    setItem(key, value) {
      store[key] = value.toString()
    },
    removeItem(key) {
      delete store[key]
    },
    clear() {
      store = {}
    },
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

const mockWindowLocationAssign = jest.fn()
Object.defineProperty(window, 'location', {
  configurable: true,
  value: { assign: mockWindowLocationAssign },
})

describe('EventList Component', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods
    axios.get.mockClear()
    localStorage.clear()
    mockWindowLocationAssign.mockClear()
  })

  test('renders without crashing', () => {
    render(<EventList />)
    const headingElement = screen.getByRole('heading', { name: /Events/i })
    expect(headingElement).toBeInTheDocument()
  })

  test('fetches and displays events', async () => {
    // Mock API response
    axios.get.mockResolvedValueOnce({
      data: {
        events: [
          {
            _id: '1',
            title: 'Sample Event',
            image: 'event.jpg',
            location: 'New York',
            date: '2024-01-01',
            time: '10:00 AM',
          },
        ],
      },
    })

    await act(async () => {
      render(<EventList />)
      // Check if the event is rendered
      await waitFor(() => {
        expect(screen.getByText(/Sample Event/i)).toBeInTheDocument()
      })
    })
  })

  test('displays error message when fetching events fails', async () => {
    // Mock API response
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'))

    await act(async () => {
      render(<EventList />)
      // Check if error message is rendered
      await waitFor(() => {
        expect(
          screen.getByText(/Failed to fetch events. Please try again later./i)
        ).toBeInTheDocument()
      })
    })
  })

  test('displays login and register buttons when no token is present', () => {
    render(<EventList />)
    expect(screen.getByText(/Log in/i)).toBeInTheDocument()
    expect(screen.getByText(/Register/i)).toBeInTheDocument()
  })

  test('displays logout and create new buttons when a valid token is present', () => {
    // Mock valid token in localStorage
    const validToken = btoa(
      JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 1000 })
    )
    localStorage.setItem('token', `header.${validToken}.signature`)

    render(<EventList />)
    expect(screen.getByText(/Log out/)).toBeInTheDocument()
    expect(screen.getByText(/Create New/)).toBeInTheDocument()
  })

  test('redirects to home after logout', async () => {
    // Mock valid token in localStorage
    const validToken = btoa(
      JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 1000 })
    )
    localStorage.setItem('token', `header.${validToken}.signature`)

    await act(async () => {
      render(<EventList />)
      fireEvent.click(screen.getByText(/Log out/))
      // Awaiting for location.assign call
      await waitFor(() => {
        expect(localStorage.getItem('token')).toBe(null)
        expect(mockWindowLocationAssign).toHaveBeenCalledWith('/')
      })
    })
  })
})
