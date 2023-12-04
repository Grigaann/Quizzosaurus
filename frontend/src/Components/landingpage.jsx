import React from 'react';
import { Link } from 'react-router-dom';


import logo192 from '../images/logo192.png';

import Footer from './footer';
import Header from './header';

import './landingpage.css';

export default function LandingPage() {
    return (
        <div className="Home">
            <Header />
            <img src={logo192} id="logo" alt="logo" />
            <p className='par'><br/><br/>Welcome to <strong>Quizzozaurus</strong>!<br/><br/>
            To be able to play, you must have an account.</p>
            
            <div className="btns">
                <button id="btnlog"><Link to="/authenticate">LOGIN</Link></button>
                <p><strong>|</strong></p> 
                <button id="btnreg"><Link to="/register">REGISTER</Link></button>
            </div>
            
            <Footer />
        </div>
    );
}
  