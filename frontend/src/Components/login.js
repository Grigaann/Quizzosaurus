import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default function Login() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('/login', {
            username: username,
            email: email,
            password: password
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h4>Log in to your account</h4>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
                <button type="submit">Log in</button>
            </form>
            <section>
                <p>Not registered yet ? Create your account <Link to='/register'>here</Link></p>
            </section>
        </>
    );
}
