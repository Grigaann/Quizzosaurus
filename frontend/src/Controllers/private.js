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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "2em",
        color: "#333",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      }}
    >
      Loading...
    </div>
  ) : valid === true ? (
    children
  ) : (
    window.location.assign("/authenticate")
  );
}
