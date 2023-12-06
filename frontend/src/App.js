import "./App.css";

import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./Controllers/private";

import LandingPage from "./Views/PublicRoutes//LandingPage/landingpage";
import Register from "./Views/PublicRoutes/Register/register";
import Authenticate from "./Views/PublicRoutes/Authenticate/authenticate";
import Profile from "./Views/PrivateRoutes/Profile/profile";
import EditProfile from "./Views/PrivateRoutes/EditProfile/editprofile";
import Quiz from "./Views/PrivateRoutes/Quiz/quiz";
import ManageQuestions from "./Views/(Admin)/ManageQuestions/managequestions";
import Scoreboard from './Components/scoreboard';
import About from "./Views/PublicRoutes/About/about";
import Error from "./Views/PublicRoutes/Error/error";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/authenticate" element={<Authenticate />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/editprofile"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/quiz"
        element={
          <PrivateRoute>
            <Quiz />
          </PrivateRoute>
        }
      />
      <Route
        path="/managequestions"
        element={
          <PrivateRoute>
            <ManageQuestions />
          </PrivateRoute>
        }
      />
      <Route path='/scoreboard' element={ <Scoreboard />} />
      <Route
        path="/about"
        element={
          <PrivateRoute>
            <About />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
