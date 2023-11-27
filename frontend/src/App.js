import './App.css';

import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './util/private';
import useLocalState from './util/useLocalStorage';
import Register from './Components/register';
import Profile from './Components/PrivateRoutes/profile'
import Authenticate from './Components/authenticate';

export default function App() {
  const [token, setToken] = useLocalState(null, "jwt");

  return (
    <Routes>
      {/* <Route path='/' element={ <LandingPage />} /> */}
      <Route path='/authenticate' element={<Authenticate />} />
      <Route path='/register' element={<Register />} />
      <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
    </Routes>
  );
}
