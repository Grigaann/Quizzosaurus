import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import {register} from '../Controllers/Auth';

export default function Register() {
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        navigate(register({usrnm: username, eml: email, pwd: password}, confirmPassword, setError));
        setLoading(false);
    };

    return (
        <>
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
        </>
    );
}
