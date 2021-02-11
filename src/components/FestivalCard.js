import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'



function FestivalCard({ favorite, favorites, setFavorites, currentUser, festival, favoritesLength, setFavoritesLength }) {
    const history = useHistory()
    const { id, name, city, image, dates } = festival

    function handleClick() {
        history.push(`/festivals/${id}`)
    }

    function handleAddToFavorites() {

        fetch(`${process.env.REACT_APP_API_BASE_URL}/favorites/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                festival_id: festival.id,
                user_id: currentUser.id
            })

        })
        .then(r => r.json())
        .then(favObj => {
            setFavorites([...favorites, favObj])
            setFavoritesLength(1)
        })
    }

    
    
    return (
        <div className="festival-card">
            <img src={image} alt={name} onClick={handleClick}/>
            <h3 onClick={handleClick}>{name}</h3>
            <p>{city}</p>
            <p>{dates[0]} - {dates[1]}</p>
            {currentUser ? !favorite ? <button className="fav-btn" onClick={handleAddToFavorites}>❣️</button> : "You faved this fest!" : null}
        </div>
        
    )
}

export default FestivalCard