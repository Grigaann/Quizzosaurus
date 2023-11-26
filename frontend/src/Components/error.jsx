const React = require('react');

module.exports = ({ message, error }) => (
  <div>
    <h1>Error</h1>
    <p>{message}</p>
    <pre>{error.stack}</pre>
  </div>
);