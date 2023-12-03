import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import LandingPage from './Components/landingpage';
import Register from './Components/register';
import About from './Components/about';
import Quiz from './Components/quiz';
// import Login from './Components/login';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={ <LandingPage />} />
      <Route path='/register' element={ <Register />} />
      <Route path='/about' element={ <About />} />
      <Route path='/quiz' element={ <Quiz />} />
      {/* <Route path='/login' element={ <Login />} /> */}
    </Routes>
  );
}