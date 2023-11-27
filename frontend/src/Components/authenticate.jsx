import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import useLocalState from '../util/useLocalStorage';

import axios from 'axios';

export default function Authenticate() {
    const [token, setToken] = useLocalState(null, "jwt");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                username: username,
                password: password
            });
    
            if (response.data.token) {
                console.log('Login successful! Token:', response.data.token);
                setToken(response.data.token);
                navigate(response.data.redirection);
            } else {
                console.log('Login failed.');
                setError(response.data.error || 'Login failed. Please try again');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Login failed. Please try again.');
        }
        return token
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h4>Log in to your account</h4>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete='off' required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete='off' required />
                </label>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Log in</button>
            </form>
            <section>
                <p>Not registered yet ? Create your account <Link to='/register'>here</Link></p>
            </section>
        </>
    );
}
