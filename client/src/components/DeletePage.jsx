import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DeletePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`);
            navigate('/');
        } catch (err) {
            console.error('Failed to delete event:', err);
            alert('Failed to delete event');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">Delete Event with ID: {id}</h1>
                <div className="flex justify-between space-x-4">
                    <button 
                        onClick={handleDelete} 
                        className="w-full px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Confirm Delete
                    </button>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="w-full px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
