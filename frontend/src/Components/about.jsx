import React from 'react';

import Footer from './footer';
import Header from './header';

import brachio from '../images/brachio.png'

import './about.css';

export default function About() {
    return (
        <div className="about">
            <Header />
            <h2 id="whatis">What is Quizzozaurus ?</h2>
            <img src={brachio} id="brachio" alt="brachio"/>
            <p className="quizzozaure"><br/>Quizzozaurus is an online quizz on the creatures
            living on Earth living million of years before us humans.</p>
            <br/>
            <p className="quizzozaure"><strong>Test your knowledge</strong><br/> about these anthics creatures and compete for the 1st on the scoreboard !</p>
            <h2 id="team">The Team</h2>
            <p id="teampres">
                Ylan, Max and Maxime are the students who developped this website.<br/><br/>
                We wanted to create a quizz which could be at the same time fun, and edutainment-oriented.<br/>
                For this, dinosaurs (and other creatures living millions of years ago) were the perfect theme.
                A mix between having fun with anthics creatures which inspired our imagination and beliefs and learning more about them.
                <br/><br/>
                We hope the concept will please you and you'll have a good time. Enjoy !<br/>
            </p>
            <Footer />
        </div>
    );
}
  