import React, { useState } from 'react'
import './styles/Login.css'

function Login({ onLogin }) {
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })

    return (
        <div className="login-box-container">
        <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={onLogin} className="login-form">
                <div className="user-box">
                    <input 
                        type="text"
                        value={loginData.username}
                        onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                        required
                    />
                    <label>Username</label>
                </div>
                <div className="user-box">
                    <input 
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        required
                    />
                    <label>Password</label>
                </div>
                <a href="/">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                        Submit
                </a>
            </form>
        </div>
        </div>
    )
}

export default Login