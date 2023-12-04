import React, { useEffect, useState } from 'react';

import axios from "axios";

import { logout,deleteUser } from '../../Controllers/Auth';

import './profile.css'

import Footer from '../footer';
import Header from '../header';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [elo, setElo] = useState(0);

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
                    setElo(resp.data.user.elo);
                });
            } catch (err) { console.log(err); }
        }
        fetchData()


    }, []);

    return (
        <>
            <Header />
            <div class="profile">
                <h2 id="proftitle">Profile</h2>
                <div id="usernamediv">
                    <h3 id="profname">Username</h3>
                    <p>{username}</p>
                </div>
                <div id="maildiv">
                    <h3 id="profmail">E-mail</h3>
                    <p>{email}</p>
                </div>
                <div id="elodiv">
                    <h3 id="profelo">Score</h3>
                    <p>{elo}</p>
                </div>
                <br/>
                <button className="button-form" onClick={ChgPwd}><strong>Change password</strong></button>
                <button className="button-form" onClick={logOut}><strong>Log out</strong></button>
                <button className="button-form" color='red' onClick={DeleteAccount}><strong>Delete account</strong></button>
            </div>
            <Footer />
        </>
    )
}