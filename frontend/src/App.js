import './App.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/login';
import Register from './Components/register';

export default function App() {
  return (
    <>
      <Routes>
        {/* <Route path='/' element={ <LandingPage />} /> */}
        <Route path='/login' element={ <Login />} />
        <Route path='/register' element={ <Register />} />
      </Routes>
    </>
  );
}
