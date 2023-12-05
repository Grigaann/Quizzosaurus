import React, {useEffect} from 'react';

import axios from "axios";

import { Bar } from "react-chartjs-2"

import Footer from './footer';
import Header from './header';

import './scoreboard.css';

import { BarElement, Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'




export default function Scoreboard() {
    var data = { 
        labels: [],
        datasets: [
            {
                label: "Score",
                data: [],
                backgroundColor:[ "rgb(200, 165, 107)"],
            },
    
        ],
    }
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                axios.get('http://localhost:8080/api/topmostPlayers')
                .then(resp => {
                    for(let i=0; i<resp.data.topmostPlayers.length; i++){
                        console.log(resp.data.topmostPlayers[i]);
                        data.labels.push(resp.data.topmostPlayers[i].username);
                        data.datasets[0].data.push(resp.data.topmostPlayers[i].elo);
                    }
                });
            } catch (err) {console.log(err); }
        }
        fetchData()
    }, []);

    const options = {
        maintainAspectRatio: false,
    }

    return (
        <div className="scoreboardpage">
            <Header />
            <h2 id="scoretitle">Top 5 ranking</h2>
            <div className='container'>
                <Bar 
                    data={data} 
                    options = {options}
                    />
            </div>
            <Footer />
        </div>
    );
}

