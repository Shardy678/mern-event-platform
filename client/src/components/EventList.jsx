import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Event from './Event'
function isTokenValid() {
    const token = localStorage.getItem('token');

    if (!token) {
        return false;
    }

    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000); 

        return decodedToken.exp > currentTime; 
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
            .then(response => {
                console.log('Fetched events:', response.data); 
                setEvents(response.data);
            })
            .catch(error => console.error(error))
    },[])

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="mx-auto p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Events</h1>
                
                <div className="flex justify-center space-x-4 mb-6">
                    {!isTokenValid() && (
                        <>
                            <a 
                                href="/login" 
                                className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Log in
                            </a>
                            <a 
                                href="/register" 
                                className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Register
                            </a>
                        </>
                    )}
                    {isTokenValid() && (
                        <>
                            <a 
                                href="/" 
                                onClick={logout} 
                                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Log out
                            </a>
                            <a 
                                href="/add" 
                                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Create New
                            </a>
                        </>
                    )}
                </div>

                <ul className="flex flex-wrap gap-6">
                    {events.map(event => (
                        <li key={event._id} className="">
                            <Event 
                                id={event._id} 
                                title={event.title} 
                                image={event.image} 
                                description={event.description} 
                                location={event.location} 
                                createdBy={event.createdBy ? event.createdBy.name : 'Unknown'} 
                                className="h-full bg-white rounded-lg shadow-md p-4"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default EventList;
