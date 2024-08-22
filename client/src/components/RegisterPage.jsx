import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);

    async function register(e) {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password
            })
            const data = response.data
            localStorage.setItem('token', data.token);
            navigate('/'); 
            alert('User created succesfully')
        } catch (error) {
            console.error(error)
            const errorMessage = error.response?.data?.msg || 'Registration failed';
            setError(errorMessage);
            alert('Error: ' + errorMessage);
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={register}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={name} 
                        onChange={handleNameChange} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email} 
                        onChange={handleEmailChange} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        required 
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}