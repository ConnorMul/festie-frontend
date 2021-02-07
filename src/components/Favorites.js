import React from 'react'
import ProfileReviewCard from './ProfileReviewCard'
import ProfileFavoriteCard from './ProfileFavoriteCard'
import './styles/Favorites.css'

function Favorites({ currentUser, favorites, reviews, handleDeleteFavorite }) {
    
    const favs = favorites.map(favorite => {
        return <ProfileFavoriteCard key={favorite.id} favorite={favorite} handleDeleteFavorite={handleDeleteFavorite} />
    })
    
    
    return (
        <>
        <h1 className="faved-title">Fests you've Faved!</h1>
            <div className="profile-container">
                <div className="favorites-container">
                    {favs}
                </div>
            </div>
        </>
       
    )
}

export default Favorites