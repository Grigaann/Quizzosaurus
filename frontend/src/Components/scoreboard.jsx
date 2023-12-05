import React, { useEffect, useState } from 'react';

import axios from "axios";

import { Bar } from "react-chartjs-2"

import Footer from './footer';
import Header from './header';

import './scoreboard.css';

import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'




export default function Quiz() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [elo, setElo] = useState(0);

    const data = { 
        labels: ["Max","Ylan","mama","boubou","gentil"],
        datasets: [
            {
                label: "Score",
                data: [30,21,25,17,8],
                backgroundColor:[ "rgb(200, 165, 107)"],
            },
    
        ],
    }
    
    const options = {
        maintainAspectRatio: false,
    }

    return (
        <div className="quizpage">
            <Header />
            <h2 id="scoretitle">Top 5 ranking</h2>
            <div className='container'>
                <div className='score'>
                    <Bar data={data} options = {options}/>
                </div>
            </div>
            <Footer />
        </div>
    );
}
  