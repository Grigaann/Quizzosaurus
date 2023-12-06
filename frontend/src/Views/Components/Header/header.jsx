import React, { useState } from 'react';
import trice from '../../../images/trice.png';
import { Link } from "react-router-dom";

import './header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='header'>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div className='navbar'>

        <div className='dropdown'>

          <button className={`dropbtn ${isOpen ? 'rotate' : ''}`} onClick={() => setIsOpen(!isOpen)}><i className="fa fa-bars"></i><strong> Menu</strong></button>

          {isOpen && (
            <div className='dropdown-content'>
              <Link className="dropdown-link" to='/'><strong>Home</strong></Link>
              <Link className="dropdown-link" to='/quiz'><strong>Quiz</strong></Link>
              <Link className="dropdown-link" to='/scoreboard'><strong>Scoreboard</strong></Link>
              <Link className="dropdown-link" to='/about'><strong>About us</strong></Link>
            </div>
          )}
        </div>

        <Link id="titlelink" to="/">
          <img src={trice} className="trice" alt="logo" /><h2 id="title"><strong>Quizzosaurus</strong></h2>

        </Link>
        <div className='profile-icon'>
          <Link id="profilebtn" to='/profile'><svg xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg></Link>
        </div>
      </div>
    </header>
  );
}