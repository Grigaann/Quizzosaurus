import React, { useEffect, useState } from 'react';

import axios from "axios";

import { logout, deleteUser } from '../../../Controllers/auth';

import Footer from '../../Components/Footer/footer';
import Header from '../../Components/Header/header';

import './profile.css'

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
                axios.get(`${process.env.REACT_APP_API_URL}/api/validateToken`, { withCredentials: true }).then(async response => {
                    const resp = await axios.post(`${process.env.REACT_APP_API_URL}/api/checkUser/${response.data.tokenID}`);
                    setUsername(resp.data.user.username);
                    setEmail(resp.data.user.email);
                    setElo(resp.data.user.elo)
                });
            } catch (err) { console.log(err); }
        }
        fetchData()


    }, []);

    return (
        <>
            <Header />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <div className="profile">

                <h2 id="proftitle">Profile</h2>
                <button className="editbtn" onClick={ChgPwd}><svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg></button>
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
                <br />
                <button className="button-form" onClick={logOut}><strong>Log out</strong></button>
                <button className="button-form" color='red' onClick={DeleteAccount}><strong>Delete account</strong></button>
            </div>
            <Footer />
        </>
    )
}