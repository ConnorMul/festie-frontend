import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import './styles/Dropdown.css'
import { useDetectOutsideClick } from './useDetectOutsideClick';

function Dropdown() {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

    return (
        <div className="menu-container">
            <button onClick={onClick} className="menu-trigger">
                <span>Explore</span>
    
            </button>
            <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                <ul>
                    <li><Link to="/trending">Trending</Link></li>
                    <li><Link to="/trips">FestieHunt</Link></li>
                    <li><Link to="/saved">Festdule</Link></li>
                </ul>
            </nav>
      </div>
    );
};

export default Dropdown