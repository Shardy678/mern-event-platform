import React, { useEffect, useState } from 'react';
import axios from 'axios';

function isTokenValid() {
    const token = localStorage.getItem('token');

    if (!token) {
        return false;
    }

    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

        return decodedToken.exp > currentTime; // Check if token is expired
    } catch (e) {
        return false;
    }
}

function logout() {
    localStorage.removeItem('token');
}

function EventList() {
    const [events,setEvents] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:5000/api/events')
            .then(response => setEvents(response.data))
            .catch(error => console.error(error))
    },[])

    return (
        <div>
            <h1>Events</h1>
            {!isTokenValid() && <a href="/login">Log in</a>}
            {!isTokenValid() && <a href="/register">Register</a>}
            {isTokenValid() && <a href='/' onClick={logout}>Log out</a>}
            {isTokenValid() && <a href="/add">Create New</a>}
            <ul>
                {events.map(event => (
                    <li key={event._id}>
                        <a href={`/events/${event._id}`}><h2>{event.title}</h2></a>
                        <img src={event.image} alt="" />
                        <p>{event.description}</p>
                        <p>{event.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default EventList;
