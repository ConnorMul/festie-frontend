import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'



function FestivalCard({ favorite, favorites, setFavorites, currentUser, festival }) {
    const [isFaved, setIsFaved] = useState(false)
    const history = useHistory()
    const { id, name, city, image, dates } = festival

    function handleClick() {
        history.push(`/festivals/${id}`)
    }

    function handleAddToFavorites() {
        currentUser ? 
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
            setIsFaved(!isFaved)
            console.log(favObj)
        })
        : alert("Log in to add this to your favorites!")
    }

    console.log(festival.favorites)
    
    return (
        <div className="festival-card">
            <img src={image} alt={name} onClick={handleClick}/>
            <h3>{name}</h3>
            <p>{city}</p>
            <p>{dates[0]} - {dates[1]}</p>
            {festival.favorites.length === 0 && !isFaved ? <button className="fav-btn" onClick={handleAddToFavorites}>❣️</button> : "You already faved this fest!"}
        </div>
        
    )
}

export default FestivalCard