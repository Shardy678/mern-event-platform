import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token');
        if (!token) {
            setError('User is not authenticated');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/events', {
                title,
                description,
                image,
                location,
            },{
                headers: {
                    'x-auth-token': token
                }
            })

            if (response.status === 201) {
                navigate('/');
            }
            
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.msg || 'Event creation failed';
            setError(errorMessage);
            alert('Error: ' + errorMessage);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">Add New Event</h1>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                        <input 
                            type="text" 
                            id="title" 
                            value={title} 
                            onChange={e => setTitle(e.target.value)} 
                            required
                            className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                        <textarea 
                            id="description" 
                            value={description} 
                            onChange={e => setDescription(e.target.value)} 
                            required
                            className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL:</label>
                        <input 
                            id="image" 
                            value={image} 
                            onChange={e => setImage(e.target.value)} 
                            required
                            className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
                        <input 
                            type="text" 
                            id="location" 
                            value={location} 
                            onChange={e => setLocation(e.target.value)} 
                            required
                            className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Add Event
                    </button>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default AddEvent