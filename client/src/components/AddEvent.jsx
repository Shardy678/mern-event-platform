import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/api/events', {
                title,
                description,
                location
            })

            if (response.status === 201) {
                navigate('/');
            }
            
        } catch (err) {
            console.error(err)
            setError('Failed to add event. Please try again.')
        }
    }

    return (
        <div>
            <h1>Add New Event</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id='title' value={title} onChange={e=> setTitle(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id='description' value={description} onChange={e=> setDescription(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input type="text" id='location' value={location} onChange={e=> setLocation(e.target.value)} required/>
                </div>
                <button type="submit">Add Event</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default AddEvent