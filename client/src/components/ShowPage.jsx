import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ShowPage() {
    const { id } = useParams();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-semibold text-gray-800 mb-6">Show Page for ID: {id}</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                <ul className="space-y-4">
                    <li>
                        <Link to='/' 
                            className="block text-center text-blue-600 hover:text-blue-700 hover:underline bg-blue-100 rounded-lg py-2">
                            Go Back
                        </Link>
                    </li>
                    <li>
                        <Link to={`/events/${id}/edit`} 
                            className="block text-center text-green-600 hover:text-green-700 hover:underline bg-green-100 rounded-lg py-2">
                            Edit
                        </Link>
                    </li>
                    <li>
                        <Link to={`/events/${id}/delete`} 
                            className="block text-center text-red-600 hover:text-red-700 hover:underline bg-red-100 rounded-lg py-2">
                            Delete
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
