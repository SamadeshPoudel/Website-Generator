import React from 'react'

const Login = () => {
    const handleLogin = ()=>{
        window.location.href = 'http://localhost:3000/auth/google/login'; //URL TO INITIATE O-AUTH FLOW
    }

  return (
    <>
    <h3>Login Page</h3>
    <button onClick={handleLogin}>
        Login with google
    </button>
    </>
    
  )
}

export default Login;