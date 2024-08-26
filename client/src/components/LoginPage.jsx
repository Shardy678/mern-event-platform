import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import LongButton from "./LongButton";

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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">Log in</h1>
                <form onSubmit={login} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email} 
                            onChange={handleEmailChange} 
                            required 
                            className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password:
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password} 
                            onChange={handlePasswordChange} 
                            required 
                            className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-400"
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <LongButton type="submit" text={'Log in'}> 
                    </LongButton>
                </form>
            </div>
        </div>
    )
}