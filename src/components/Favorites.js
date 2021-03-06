import React from 'react'
// import ProfileReviewCard from './ProfileReviewCard'
import ProfileFavoriteCard from './ProfileFavoriteCard'
import './styles/Favorites.css'

function Favorites({ favorites, handleDeleteFavorite }) {
    
    const favs = favorites.map(favorite => {
        return <ProfileFavoriteCard key={favorite.id} favorite={favorite} handleDeleteFavorite={handleDeleteFavorite} />
    })
    
    
    return (
        <div className="main-profile-container">
        <h1 className="faved-title">Fests you've Faved!</h1>
            <div className="profile-container">
                <div className="favorites-container">
                    {favs}
                </div>
            </div>
        </div>
       
    )
}

export default Favorites