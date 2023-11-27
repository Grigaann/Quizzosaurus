import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import axios from 'axios';
import bcrypt from 'bcryptjs';

export default function Register() {
    const [loading, setLoading] = useState(true);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const avlbl = await axios.post('http://localhost:8080/api/checkUser', { username, email });
            if (!avlbl.data.available) {
                setError('Username or email is already taken!');
                return;
            } else {
                bcrypt.genSalt(10).then(salt => {
                    bcrypt.hash(password, salt)
                        .then(async (hashed) => {
                            await axios.post('http://localhost:8080/api/signup', {
                                username: username,
                                email: email,
                                password: hashed
                            })
                                .then((response) => {
                                    if (response.data.success) {
                                        console.log('Registration successful!');
                                        navigate(response.data.redirection);
                                    } else {
                                        console.log('Registration failed.');
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        });
                });
            }
        } catch (error) {
            console.error('Registration failed:', error.message);
            setError('Registration failed. Please try again.');
        }
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
                {loading ? <button type="submit">Sign up</button> : <button disabled>Loading...</button>}
            </form>
            <section>
                <p>Already have an account? <Link to='/authenticate'>Login instead</Link></p>
            </section>
        </>
    );
}
