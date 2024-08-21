import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ShowPage() {
    const { id } = useParams();
    return (
        <>
            <h1>Show Page for id: {id}</h1>
            <ul>
                <li>
                    <Link to='/'>Go Back</Link>
                </li>
                <li>
                    <Link to={`/events/${id}/edit`}>Edit</Link>
                </li>
                <li>
                    <Link to={`/events/${id}/delete`}>Delete</Link>
                </li>
            </ul>
        </>
    );
}
