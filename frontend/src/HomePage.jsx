import React from 'react'

const HomePage = () => {
  return (
    <div>
        <h1>Generate any kind of website for free</h1>
    </div>
  )
}

export default HomePage


// import React, { useEffect, useState } from 'react';

// const HomePage = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/home', {
//           method: 'GET',
//           credentials: 'include',
//         });
//         const data = await response.json();
//         setUser(data);
//       } catch (error) {
//         console.error('Failed to fetch user data:', error);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <div>
//       <h1>Generate any kind of website for free</h1>
//       {user && <p>Welcome, {user.name}!</p>}
//     </div>
//   );
// };

// export default HomePage;
