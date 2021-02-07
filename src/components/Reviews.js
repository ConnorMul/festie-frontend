import React from 'react'
import ProfileReviewCard from './ProfileReviewCard'
import ProfileFavoriteCard from './ProfileFavoriteCard'
import './styles/Reviews.css'

function Reviews({ currentUser, favorites, reviews, handleDelete, handleEditReviewButtonClick }) {


    const revs = reviews.map(review => {
        return <ProfileReviewCard key={review.id} review={review} handleDelete={handleDelete} handleEditReviewButtonClick={handleEditReviewButtonClick}/>
    })
    
    
    return (
       <div className="review-profile-container">
        <h1 id="reviewed-title">Fests you've Reviewed</h1>
        <div className="profile-container">
            
            <div className="reviews-container">
            
                {revs}
            </div>
        </div>
        </div>
    )
}

export default Reviews