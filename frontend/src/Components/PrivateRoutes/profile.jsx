import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { logout,deleteUser } from '../../Controllers/Auth';

import EditProfile from './editprofile';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const ChgPwd = () => window.location.assign('/editprofile');

    const logOut = async () => await logout();

    const DeleteAccount = async () => await deleteUser();

    return (
        <>
            <section>
                <h1>Profile</h1>
                <h3>Username</h3>
                <p>{username}</p>
                <h3>E-mail</h3>
                <p>{email}</p>
                <button onClick={ChgPwd}>Change password</button>
                <button onClick={logOut}>Log out</button>
                <button color='red' onClick={DeleteAccount}>Delete account</button>
            </section>
        </>
    )
}