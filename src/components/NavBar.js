import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Dropdown from './Dropdown'
import './styles/NavBar.css'

function NavBar({onLogin, currentUser}) {
    const [openMenu, setOpenMenu] = useState(false)
    


    
    return (
        <div className="navbar">
            <NavLink className="navbar-links" to="/festivals">Festivals</NavLink>
            <div id="dropdown-container">
                <Dropdown />
                {/* {openMenu ? 
                <div className="dropdown">
                    <ul>
                        <li>Option 1</li>
                        <li>Option 2</li>
                        <li>Option 3</li>
                        <li>Option 4</li>
                    </ul>
                </div>
                : null} */}
            </div>
            <NavLink className="navbar-links" to="/">Festie</NavLink>
            {currentUser ? 
            <>
                <NavLink to='/about' className="navbar-links">Festie101</NavLink>
                <NavLink to='/profile' className="navbar-links">{currentUser.username}</NavLink> 
            </>
            :
            <>
                <button className="login-btn" onClick={onLogin}>Login</button> 
                <button className="login-btn">Signup</button>
            </>
            }
        </div>
    )
}

export default NavBar