import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Dropdown from './Dropdown'
import DropdownProfile from './DropdownProfile'
import './styles/NavBar.css'

function NavBar({ onLogin, handleLogout, currentUser }) {
    const [openMenu, setOpenMenu] = useState(false)
    
    
    return (
        <div className="navbar">
            <NavLink className="navbar-links" to="/festivals">Fests</NavLink>
            <div id="dropdown-container">
                <Dropdown />
            </div>
            <NavLink className="navbar-links" to="/">Festie</NavLink>
            {currentUser ? 
            <>
                <NavLink to='/festiefeed' className="navbar-links">FestieFeed</NavLink>
                <DropdownProfile handleLogout={handleLogout}/>
            </>
            :
            <>
                <NavLink to='/login' className="navbar-links">Login</NavLink> 
                <NavLink to='/signup' className="navbar-links">Signup</NavLink>
            </>
            }
        </div>
    )
}

export default NavBar