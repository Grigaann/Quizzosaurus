import React from 'react';
import { Bar } from "react-chartjs-2"

import Footer from './footer';
import Header from './header';

import './scoreboard.css';

import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

const data = { 
    labels: ["Max","Ylan","mama"],
    datasets: [
        {
            label: "Score",
            data: [30,21,25],
            backgroundColor:[]
        },

    ],
}

export default function Quiz() {
    return (
        <div className="quizpage">
            <Header />
            <h2>Top 5 ranking</h2>
            <div className='container'>
            
                <div className='score'>
                    <Bar data={data} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
  