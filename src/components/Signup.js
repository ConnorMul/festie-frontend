import React, { useState } from 'react'
import './styles/Signup.css'

function Signup() {
    const [signupData, setSignupData] = useState({
        username: "",
        password: "",
        email: ""
    })

    return (
        <div className="signup-box-container">
        <div className="signup-box">
            <h2>Signup</h2>
            <form  className="signup-form">
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
                    <label>email</label>
                </div>
                <div className="btn-animd">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                       <button className="signup-submit-btn">Submit</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Signup