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
        <div>
            <h1>Edit Event</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" onChange={handleTitleChange} id='title' value={title} required/>
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea onChange={handleDescriptionChange} id='description' value={description} required/>
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input onChange={handleLocationChange} type="text" id='location' value={location} required/>
                </div>
                <button type="submit">Add Event</button>
                <button onClick={() => navigate(-1)}>Cancel</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}