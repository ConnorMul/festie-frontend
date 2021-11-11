import React from 'react'
import ProfileReviewCard from './ProfileReviewCard'
import './styles/Reviews.css'

function Reviews({ userReviews, handleDelete, handleEditReviewButtonClick }) {

    return (
       <div className="review-profile-container">
        <h1 id="reviewed-title">Fests you've Reviewed</h1>
        <div className="profile-container">
            <div className="reviews-container">
            {userReviews ?
            userReviews.map(review => {
            return <ProfileReviewCard key={review.id} review={review} handleDelete={handleDelete} handleEditReviewButtonClick={handleEditReviewButtonClick}/>
            })
            : null
            }
            </div>
        </div>
        </div>
    )
}

export default Reviews