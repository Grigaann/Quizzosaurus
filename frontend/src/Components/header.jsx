import React from 'react';
import trice from '../images/trice.png';
import { Link } from "react-router-dom";

import './header.css';

export default function Header() {
    return (
        <header className='header'>
          <ul>
            <img src={trice} className="trice" alt="logo" />
            <h2 id="title">Quizzosaurus</h2>
            <li><Link to='/profile'><strong>Profile</strong></Link></li>
            <li><a href='/'><strong>ScoreBoard</strong></a></li>
            <li><a href='/'><strong>Quiz</strong></a></li>
            <li><a href='/'><strong>About us</strong></a></li>
            <li><a href='/'><strong>Home</strong></a></li>
          </ul>
        </header>
    );
}
  