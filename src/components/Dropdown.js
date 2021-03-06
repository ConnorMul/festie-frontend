import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import './styles/Dropdown.css'
import { useDetectOutsideClick } from './useDetectOutsideClick';

function Dropdown() {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

    function closeMenu() {
        setIsActive(false)
    }

    return (
        <div className="menu-container">
            <Link onClick={onClick} className="menu-trigger">
                Explore
            </Link>
            <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                <ul>
                    <li><Link to="/festivals/trending" onClick={closeMenu}>Trending</Link></li>
                    <li><Link to="/about" onClick={closeMenu}>Festie 101</Link></li>
                    <li><Link to="/festiefinder" onClick={closeMenu}>Festie Finder</Link></li>
                </ul>
            </nav>
      </div>
    );
};

export default Dropdown