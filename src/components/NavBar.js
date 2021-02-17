import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Dropdown from './Dropdown'
import DropdownProfile from './DropdownProfile'
import './styles/NavBar.css'

function NavBar({ handleLogout, currentUser }) {

    return (
        
        <div className="navbar">
            <NavLink className="navbar-links" to="/festivals">Festivals</NavLink>
            <div id="dropdown-container">
                <Dropdown />
            </div>
            <NavLink className="navbar-links" to="/">Festie</NavLink>
            {currentUser ? 
            <>
                <NavLink to='/festiefeed' className="navbar-links">FestieFeed</NavLink>
                <DropdownProfile handleLogout={handleLogout} currentUser={currentUser}/>
            </>
            :
            <>
                <NavLink to='/login' className="navbar-links-login">LogIn</NavLink> 
                <NavLink to='/signup' className="navbar-links">Sign-Up</NavLink>
            </>
            }
        </div>
       
    )
}

export default NavBar