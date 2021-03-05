import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './styles/Signup.css'

function Signup({ setCurrentUser }) {
    const [signupData, setSignupData] = useState({
        username: "",
        password: "",
        email: "",
        avatar: {}
    })

    const history = useHistory()

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
              })
        }
    }, [token])

    function handleSignup(e) {
        e.preventDefault()

        const form = new FormData()
        form.append("username", signupData.username)
        form.append("password", signupData.password)
        form.append("email", signupData.email)
        form.append("avatar", signupData.avatar)

        fetch(`${process.env.REACT_APP_API_BASE_URL}/signup`, {
            method: "POST",
        
            body: form
        })
        .then(r => r.json())
        .then(data => {
            setToken(data.token)
            localStorage.setItem("token", data.token)
            history.push("/festivals")
        })
    }

    return (
        <div className="signup-box-container">
        <div className="signup-box">
            <h2>Signup</h2>
            <form  className="signup-form" onSubmit={handleSignup}>
                <div className="user-box">
                    <input
                        type="text"
                        value={signupData.username}
                        onChange={(e) => setSignupData({...signupData, username: e.target.value})}
                        required
                    />
                    <label>Username</label>
                </div>
                <div className="user-box">
                    <input
                        type="password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                        required
                    />
                    <label>Password</label>
                </div>
                <div className="user-box">
                    <input
                        type="text"
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        required
                    />
                    <label>Email</label>
                </div>
                <div className="user-box">
                    <input
                        type="file"
                        // value={signupData.avatar}
                        onChange={(e) => setSignupData({...signupData, avatar: e.target.files[0]})}
                        required
                    />
                </div>
                <div className="btn-animd">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                       <button className="signup-submit-btn">Signup</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Signup