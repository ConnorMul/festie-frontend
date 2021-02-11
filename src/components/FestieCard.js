import React from 'react'
import { useHistory } from 'react-router-dom'
import './styles/FestieFinder.css'

function FestieCard({ festie }) {
    
    const history = useHistory()

    function handleProfileClick(festieClicked) {
        history.push(`/festiefinder/${festie.id}`)
    }
    
    
    return (
        <div className="festie-card">
            <img src={festie.avatar} alt={festie.username} onClick={() => handleProfileClick(festie)}/>
            <h1>{festie.username}</h1>
        </div>
    )
}

export default FestieCard