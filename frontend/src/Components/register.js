import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        bcrypt.genSalt(10).then(salt => {
            bcrypt.hash(password, salt)
                .then(async (hashed) => {
                    await axios.post('http://localhost:8080/api/signup', {
                        username: username,
                        email: email,
                        password: hashed
                    })
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h4>Sign up here</h4>
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
                <label>
                    Confirm Password:
                    <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                </label>
                <button type="submit">Sign up</button>
            </form>
            <section>
            <p>Already have an account? <Link to='/login'>Login instead</Link></p>
            </section>
        </>
    );
}
