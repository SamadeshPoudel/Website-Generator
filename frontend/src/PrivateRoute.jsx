// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//   const token = document.cookie.split('; ').find(row => row.startsWith('auth_token'))?.split('=')[1];
//   return token ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = document.cookie.split('; ').find(row => row.startsWith('auth_token'))?.split('=')[1];
  // console.log('Token:', token); // Add this to see if the token is being retrieved

  if (!token) {
    console.log('No auth token found, redirecting to login.');
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

