import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './styles/Login.css'
import Swal from 'sweetalert2'

function Login({ setCurrentUser, setUserReviews, setFavorites }) {
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })
    const [token, setToken] = useState(null)

    useEffect(() => {
        if (token) {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/autologin`, {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${token}`
                }
              })
              .then(r => r.json())
              .then(user => {
                setCurrentUser(user)
                setFavorites(user.favorites)
                setUserReviews(user.reviews)
              })
        }
    }, [token])

    const history = useHistory()

    function handleLogin(e) {
        e.preventDefault()

        fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        .then(r => r.json())
        .then(data => {
            if (data.failure) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Incorrect Username or Password!'
                  })
            } else {
            
            setToken(data.token)
            localStorage.setItem("token", data.token)
            history.push("/festivals")
            }
        })
    }

    return (
        <div className="login-box-container">
        <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login-form">
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
                <div className="btn-animed">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                        <button className="login-submit-btn">Login</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Login