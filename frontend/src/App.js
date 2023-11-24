import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import LandingPage from './Components/landingpage';
import Register from './Components/register';
// import Login from './Components/login';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={ <LandingPage />} />
      <Route path='/register' element={ <Register />} />
      {/* <Route path='/login' element={ <Login />} /> */}
    </Routes>
  );
}