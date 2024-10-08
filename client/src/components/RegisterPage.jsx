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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">Register</h1>
                <form onSubmit={register} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name:
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={name} 
                            onChange={handleNameChange} 
                            required 
                            className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                        />
                    </div>
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
                            className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
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
                            className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button 
                        type="submit" 
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}