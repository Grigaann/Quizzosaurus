import React from 'react';
import { Link } from 'react-router-dom';


import logo192 from '../../../images/logo192.png';

import Footer from '../../Components//Footer/footer';
import Header from '../../Components/Header/header';

import './landingpage.css';

export default function LandingPage() {
    return (
        <div className="Home">
            <Header />
            <a id="hiddenlink" href="https://www.youtube.com/watch?v=WH6Jfqen1H8"><img src={logo192} id="logo" alt="logo" /></a>
            <p className='par'><br/>Welcome to <strong>Quizzozaurus</strong>!</p>

            <div className="btns">
                <Link id="btnlog" to="/quiz"><strong>PLAY</strong></Link>
            </div>

            <Footer />
        </div>
    );
}