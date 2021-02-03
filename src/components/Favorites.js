import React from 'react'
import ProfileReviewCard from './ProfileReviewCard'
import ProfileFavoriteCard from './ProfileFavoriteCard'
import './styles/Favorites.css'

function Favorites({ currentUser, favorites, reviews }) {
    
    const favs = favorites.map(favorite => {
        return <ProfileFavoriteCard key={favorite.id} favorite={favorite} />
    })

    const revs = reviews.map(review => {
        return <ProfileReviewCard key={review.id} review={review} />
    })
    
    
    return (
        <div className="profile-container">
            <div className="favorites-container">
                <h1>Fests you've Faved!</h1>
                {favs}
            </div>

            {/* <div className="reviews-container">
                <h1>Fests you've Reviewed</h1>
                {revs}
            </div> */}
        </div>
    )
}

export default Favorites