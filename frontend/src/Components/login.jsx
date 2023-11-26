import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default function Login() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await axios.post('http://localhost:8080/api/login', {
                username: username,
                email: email,
                password: hashedPassword
            })
                .then((response) => {
                    if (response.data.token) {
                        console.log('Login successful! Token:', response.data.token);
                        navigate(response.data.redirection);
                    } else {
                        console.log('Login failed.');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            setError('Invalid username or password.');
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h4>Log in to your account</h4>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete='off' required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete='off' required />
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
