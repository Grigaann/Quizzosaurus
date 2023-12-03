import React, { useState } from 'react';
import { Link } from "react-router-dom";

import {login} from '../Controllers/Auth';
import Footer from './footer';
import Header from './header';

export default function Authenticate() {
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await login({usrnm: username, pwd: password}, setError);
        setLoading(false);
    };
    return (
        <>
            <Header />
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
                <button type="submit" disabled={loading}>Log in</button>
            </form>
            <section>
                <p>Not registered yet ? Create your account <Link to='/register'>here</Link></p>
            </section>
            <Footer />
        </>
    );
}
