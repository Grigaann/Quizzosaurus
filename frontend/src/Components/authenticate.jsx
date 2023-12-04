import React, { useState } from 'react';
import { Link } from "react-router-dom";

import {login} from '../Controllers/Auth';
import Footer from './footer';
import Header from './header';

import './authenticate.css'

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
            <form id="logform" onSubmit={handleSubmit}>
                <h2 id="titleform">Log In</h2>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete='off' required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete='off' required />
                </label>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className="button-form" type="submit" disabled={loading}><strong>Log in</strong></button>
            </form>
            <section>
                <p id="reglink">Not registered yet ? Create your account <Link to='/register'><strong>here</strong></Link></p>
            </section>
            <Footer />
        </>
    );
}
