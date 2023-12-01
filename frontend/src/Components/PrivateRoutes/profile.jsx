import React, { useEffect, useState } from 'react';

import axios from "axios";

import { logout,deleteUser } from '../../Controllers/Auth';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const ChgPwd = () => window.location.assign('/editprofile');

    const logOut = async () => await logout();

    const DeleteAccount = async () => {
        if (window.confirm("You are about to delete your account permanently.\nDo you want to continue?"))
            await deleteUser();
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                axios.get('http://localhost:8080/api/validateToken', { withCredentials: true }).then(async response => {
                    const resp = await axios.post(`http://localhost:8080/api/checkUser/${response.data.tokenID}`);
                    setUsername(resp.data.user.username);
                    setEmail(resp.data.user.email);
                });
            } catch (err) { console.log(err); }
        }
        fetchData()


    }, []);

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