import React from 'react';

function Input({ label, type = 'text', id, value, onChange, required = false }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-pink-400"
            />
        </div>
    );
}

export default Input;
