import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    async function login(e) {
        e.preventDefault(); 

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });

            const data = response.data;
            localStorage.setItem('token', data.token);
            navigate('/'); 
            alert('Login successful');
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.msg || 'Login failed';
            setError(errorMessage);
            alert('Error: ' + errorMessage);
        }
    }

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value);
    
    return (
        <>
        <h1>Log in</h1>
        <form onSubmit={login}>
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
    </>
    )
}