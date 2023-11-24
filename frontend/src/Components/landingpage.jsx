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
            <img src={logo192} className="center" alt="logo" />
            <p className='center'><br/>Put the fucking REGISTER FORM <Link to="/register">THERE</Link></p>
            <Footer />
        </div>
    );
}
  