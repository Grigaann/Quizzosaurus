import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const ChgPwd = () => {
        navigate('/editprofile');
    }

    const Logout = () => {
        axios.post('http://localhost:8080/api/logout', { withCredentials: true }).then((response) => {
            if (response) navigate(response.data.redirection);
        }).catch((err) => {
            console.error(err);
        });
    }

    const DeleteAccount = () => {
        navigate('/register');
    }

    return (
        <>
            <section>
                <h1>Profile</h1>
                {/* <Link to={ <EditProfile />}>Edit profile</Link> */}
                <h3>Username</h3>
                <p>{username}</p>
                <h3>E-mail</h3>
                <p>{email}</p>
                <button onClick={ChgPwd}>Change password</button>
                <button onClick={Logout}>Log out</button>
                <button color='red' onClick={DeleteAccount}>Delete account</button>
            </section>
        </>
    )
}