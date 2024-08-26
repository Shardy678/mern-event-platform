import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LongButton from './LongButton';
import Input from './Input';
import TextAreaInput from './TextAreaInput';
import Container from './Container';
import FormWrapper from './FormWrapper';

function AddEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

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
            }, {
                headers: {
                    'x-auth-token': token,
                },
            });

            if (response.status === 201) {
                navigate('/');
            }

        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.msg || 'Event creation failed';
            setError(errorMessage);
            alert('Error: ' + errorMessage);
        }
    };

    return (
        <Container>
            <FormWrapper onSubmit={onSubmit} title="Add New Event">
                <Input
                    label="Title:"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
                <TextAreaInput
                    label="Description:"
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
                <Input
                    label="Image URL:"
                    id="image"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    required
                />
                <Input
                    label="Location:"
                    id="location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    required
                />
                <LongButton type='submit' text={'Add Event'} />
                {error && <p className="text-sm text-red-600">{error}</p>}
            </FormWrapper>
        </Container>
    );
}

export default AddEvent;
