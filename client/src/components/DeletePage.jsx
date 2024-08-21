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
        <div>
            <h1>Delete Event with id: {id}</h1>
            <button onClick={handleDelete}>Confirm Delete</button>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
    );
}
