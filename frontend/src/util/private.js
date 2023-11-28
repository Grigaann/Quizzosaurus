import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import axios from 'axios';

export default function PrivateRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [valid, setValid] = useState(null);
    
    axios.get('http://localhost:8080/api/validateToken', { withCredentials: true }).then((response) => {
        setValid(response.data.isValidated);
        setLoading(false);
    }).catch((error) => {
        console.log(error);
    });
    return loading ? <div>Loading...</div> : valid === true ? children : <Navigate to='/authenticate' />;
}