import './App.css';
// import Login from './Components/login';

import { Routes, Route } from 'react-router-dom';

import LandingPage from './Components/landingpage';
import About from './Components/about';
import Quiz from './Components/quiz';
import PrivateRoute from './util/private';
import Register from './Components/register';
import Authenticate from './Components/authenticate';
import Profile from './Components/PrivateRoutes/profile'
import EditProfile from './Components/PrivateRoutes/editprofile';
import Error from './Components/error';


export default function App() {

  return (
    <Routes>
      <Route path='/' element={ <LandingPage />} />
      <Route path='/authenticate' element={<Authenticate />} />
      <Route path='/register' element={<Register />} />
      <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path='/editprofile' element={<PrivateRoute><EditProfile /></PrivateRoute>} />
      <Route path='/about' element={<PrivateRoute><About /></PrivateRoute>} />
      <Route path='/quiz' element={<PrivateRoute><Quiz /></PrivateRoute>} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
