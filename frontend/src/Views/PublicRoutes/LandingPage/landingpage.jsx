import React, { useState } from 'react';
import { Link } from 'react-router-dom';


import logo192 from '../../../images/logo192.png';

import Footer from '../../Components//Footer/footer';
import Header from '../../Components/Header/header';

import axios from 'axios';

import './landingpage.css';

export default function LandingPage() {
    const [valid, setValid] = useState(false);

    axios
        .get(`${process.env.REACT_APP_API_URL}/api/validateToken`, {
            withCredentials: true,
        })
        .then((response) => {
            setValid(response.data.tokenID ? true : false);
        })
        .catch((error) => {
            console.log(error);
        });

    return (
        <div className="Home">
            <Header />
            <a id="hiddenlink"><img src={logo192} id="logo" alt="logo" /></a>
            <p id='par'><br />Welcome to <strong>Quizzozaurus</strong>!</p>

            {valid
                ? <div className="btns">
                    <Link id="btn-play" to="/quiz"><strong>PLAY</strong></Link>
                </div>
                : <div className="btns">
                    <Link to="/authenticate" className="btn-auth">LOGIN</Link>
                    <p><strong>|</strong></p>
                    <Link to="/register" className="btn-auth">REGISTER</Link>
                </div>}

            <Footer />
        </div>
    );
}