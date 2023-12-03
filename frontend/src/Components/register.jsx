import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { register } from '../Controllers/Auth';
import Footer from './footer';
import Header from './header';

import './register.css'

export default function Register() {
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        setLoading(true);
        await register({ usrnm: username, eml: email, pwd: password }, setError);
        setLoading(false);
    };

    return (
        <>
            <Header />
            <form id="regform" onSubmit={handleSubmit}>
                <h2 id="titleformreg">Sign Up</h2>
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
                <label>
                    Confirm Password:
                    <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete='off' required />
                </label>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={loading}><strong>Sign in</strong></button>
            </form>
            <section>
                <p id="loglink">Already have an account? Login <Link to='/authenticate'><strong>here</strong></Link></p>
            </section>
            <Footer />
        </>
    );
}
