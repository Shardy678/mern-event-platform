import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Event from './Event';
import Button from './Button';
import Container from './Container';
import CategoryCarousel from './CategoryCarousel';
import Search from './Search';

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
    const [events, setEvents] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [category, setCategory] = useState('All');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events', {
                    params: { title: searchTitle, category: category }
                });
                console.log('Fetched events:', response.data);
                setEvents(response.data.events);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvents();
    }, [searchTitle, category]);

    return (
        <Container>
            <div className="mx-auto p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Events</h1>
                <div className="flex justify-center space-x-4 mb-6">
                    {!isTokenValid() && (
                        <>
                            <a href="/login"> <Button text={'Log in'} color={'yellow'}/> </a>
                            <a href="/register"> <Button text={'Register'} color={'red'}/> </a>
                        </>
                    )}
                    {isTokenValid() && (
                        <>
                            <a href="/" onClick={logout} ><Button color={'red'} text={'Log out'}/></a>
                            <a href="/add"><Button color={'green'} text={'Create New'}/></a>
                        </>
                    )}
                </div>

                <Search setCategory={setCategory} setSearchTitle={setSearchTitle} searchTitle={searchTitle} category={category}/>

                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                    {events.map((event) => (
                        <li key={event._id}>
                            <Event
                                id={event._id}
                                title={event.title}
                                image={event.image}
                                location={event.location}
                                date={event.date}
                                time={event.time}
                                className="h-full bg-white rounded-lg shadow-md p-4"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
    );
}

export default EventList;
