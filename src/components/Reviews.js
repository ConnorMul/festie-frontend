import React from 'react'
import ProfileReviewCard from './ProfileReviewCard'
import ProfileFavoriteCard from './ProfileFavoriteCard'
import './styles/Profile.css'

function Reviews({ currentUser, favorites, reviews }) {


    const revs = reviews.map(review => {
        return <ProfileReviewCard key={review.id} review={review} />
    })
    
    
    return (
        <div className="reviews-container">
            <h1>Fests you've Reviewed</h1>
            {revs}
        </div>
    )
}

export default Reviews