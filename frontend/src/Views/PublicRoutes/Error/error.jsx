import React from 'react';

const Error = ({ message, error }) => {
  if (error && message) {
    return (
      <div>
        <h1>Error</h1>
        <p>{message}</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return (
      <div>Error 404 : Page not Found</div>
    );
  }
};

export default Error;