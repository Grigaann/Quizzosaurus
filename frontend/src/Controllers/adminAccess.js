import React, { useState } from "react";

import axios from "axios";

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(null);

  axios
    .get(`${process.env.REACT_APP_API_URL}/api/validateToken`, {
      withCredentials: true,
    })
    .then((response) => {
      setValid(response.data.tokenID ? true : false);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
  return loading ? (
    <div>Loading...</div>
  ) : valid === true ? (
    children
  ) : (
    window.location.assign("/authenticate")
  );
}
