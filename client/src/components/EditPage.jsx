import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditPage() {
    const [event, setEvent] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(()=> {
        async function getEventById() {
            try {
                const response = await axios.get(`http://localhost:5000/api/events/${id}`);
                const eventData = response.data;
                setEvent(eventData);
                setTitle(eventData.title);
                setDescription(eventData.description);
                setLocation(eventData.location);
            } catch (err) {
                setError('Error fetching event.');
                console.error('Error fetching event:', err);
            }
        }
        getEventById(id)
    },[id])

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleLocationChange = (e) => setLocation(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:5000/api/events/${id}`, {
                title,
                location,
                description
            })
            navigate('/')
        } catch(err) {
            setError('Error updating event.');
            console.error('Error updating event:', err);
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className='text-2xl font-bold text-center text-gray-800'>Edit Event</h1>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div>
                        <label className='block text-sm font-medium text-gray-700' htmlFor="title">Title:</label>
                        <input className='w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500' type="text" onChange={handleTitleChange} id='title' value={title} required/>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700' htmlFor="description">Description:</label>
                        <textarea className='w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500' onChange={handleDescriptionChange} id='description' value={description} required/>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'  htmlFor="location">Location:</label>
                        <input className='w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500' onChange={handleLocationChange} type="text" id='location' value={location} required/>
                    </div>
                    <button className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" type="submit">Add Event</button>
                    <button className="w-full px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={() => navigate(-1)}>Cancel</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
            
        </div>
    )
}