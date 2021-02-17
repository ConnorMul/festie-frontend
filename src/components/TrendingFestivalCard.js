import React, { } from 'react'

import { useHistory } from 'react-router-dom'

function TrendingFestivalCard({ favorite, favorites, setFavorites, currentUser, festival, setFavoritesLength }) {
    const history = useHistory()
    const { id, name, city, image, dates, average_star_rating } = festival

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

    function averageStarRating() {
        if (average_star_rating === 1) {
            return "🌟"
        } else if (average_star_rating === 2) {
            return "🌟🌟"
        } else if (average_star_rating === 3) {
            return "🌟🌟🌟"
        } else if (average_star_rating === 4) {
            return "🌟🌟🌟🌟"
        } else if (average_star_rating === 5) {
            return "🌟🌟🌟🌟🌟"
        }
    }

    return (
        <div className="festival-card">
            <img src={image} alt={name} onClick={handleClick}/>
            <h3 onClick={handleClick}>{name}</h3>
            <p>{city}</p>
            <p>{dates[0]} - {dates[1]}</p>
            <p>
            <p>Average Rating from Festies:</p>
            {averageStarRating()}
            </p>
            {currentUser ? !favorite ? <button className="fav-btn" onClick={handleAddToFavorites}>Fav ❣️</button> : "You faved this fest!" : null}
        </div>
        
    )
}

export default TrendingFestivalCard