import React from 'react';

const Error = ({ message, error }) => (
  <div>
    <h1>Error</h1>
    <p>{message}</p>
    <pre>{error.stack}</pre>
  </div>
);

export default Error;