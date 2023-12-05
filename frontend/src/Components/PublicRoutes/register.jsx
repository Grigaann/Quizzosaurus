import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { register } from '../../Controllers/auth';
import Footer from './footer';
import Header from './header';

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
            <form onSubmit={handleSubmit}>
                <h4>Sign up here</h4>
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
                <button type="submit" disabled={loading}>Sign in</button>
            </form>
            <section>
                <p>Already have an account? <Link to='/authenticate'>Login instead</Link></p>
            </section>
            <Footer />
        </>
    );
}
