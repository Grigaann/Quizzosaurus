import React from 'react';
import trice from '../images/trice.png';
import { Link } from "react-router-dom";

import './header.css';

export default function Header() {
    return (
        <header className='header'>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <ul>
            <img src={trice} className="trice" alt="logo" />
            <h2 id="title">Quizzosaurus</h2>
            
            <div className='navbar'>
             
              <div className='dropdown'>

                <button className='dropbtn'><strong>Menu</strong> 
                <i className='fa fa-caret-down'></i>
                </button>
                
                <div className='dropdown-content'>
                  <a href='/'><strong>Home</strong></a>
                  <Link to='/profile'><strong>Profile</strong></Link>
                  <Link to='/about'><strong>About us</strong></Link>
                </div>

              </div>
              <li><a href='/'><strong>ScoreBoard</strong></a></li>
              <li><a href='/quiz'><strong>Quiz</strong></a></li>  

            </div>
          </ul>
        </header>
    );
}
  