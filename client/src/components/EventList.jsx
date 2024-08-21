import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            <a href="/add">Create New</a>
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
