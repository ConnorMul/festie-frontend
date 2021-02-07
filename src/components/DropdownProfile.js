import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import './styles/Dropdown.css'
import { useDetectOutsideClick } from './useDetectOutsideClick';

function DropdownProfile({ handleLogout }) {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

    function closeMenu() {
        setIsActive(false)
    }

    return (
        <div className="menu-container">
            <Link onClick={onClick} className="menu-trigger">
                Profile
    
            </Link>
            <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                <ul>
                    <li><Link to="/profile/reviews" onClick={closeMenu}>Reviews</Link></li>
                    <li><Link to="/profile/favorites" onClick={closeMenu}>Favorites</Link></li>
                    <li><Link to="/profile" onClick={closeMenu}>Edit your Profile</Link></li>
                    <li><Link to="/" onClick={closeMenu, handleLogout} >Logout</Link></li>
                </ul>
            </nav>
      </div>
    );
};

export default DropdownProfile