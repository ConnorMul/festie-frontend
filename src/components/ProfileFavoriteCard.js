import React, { useEffect, useState } from 'react'

function ProfileFavoriteCard({ favorite, handleDeleteFavorite }) {
    const [festival, setFestival] = useState({})

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/festivals/${favorite.festival_id}`)
        .then(r => r.json())
        .then(setFestival)
    }, [favorite.festival_id])
    
    return (
        <div className="festival-card">

            <img src={festival.image} alt={festival.name}/>
            <h3>{festival.name}</h3>
            <button onClick={() => handleDeleteFavorite(favorite)}>💔💔💔</button>

        </div>
    )
}

export default ProfileFavoriteCard