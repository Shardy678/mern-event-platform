import React from 'react';
import { useParams } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CircleIcon from '@mui/icons-material/Circle';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EventShowPage() {
    const { id } = useParams(); // Get the event ID from the URL
    const [event, setEvent] = useState(null);

    useEffect(() => {
        // Fetch the event details from the API
        async function fetchEvent() {
            try {
                const response = await axios.get(`http://localhost:5000/api/events/${id}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        }
        fetchEvent();
    }, [id]);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                <img className="object-cover rounded-lg w-full h-64 mb-4" src={event.image} alt={event.title} />
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{event.title}</h1>
                <p className="text-lg sm:text-xl mb-2">
                    <CalendarMonthIcon sx={{paddingRight:'2px', color: 'gray'}}/>
                    {event.date} 
                    <CircleIcon sx={{fontSize: "0.5rem", color: 'gray'}}/> 
                    {event.time}
                </p>
                <p className="text-lg sm:text-xl mb-4 text-gray-600">{event.location}</p>
                <p className="text-base sm:text-lg">{event.description}</p>
            </div>
        </div>
    );
}
