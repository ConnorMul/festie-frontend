import React from 'react'
import './styles/FestivalReviewCard.css'

function FestivalReviewCard({ handleDelete, handleEditButtonClick, currentUser, review }) {
    
    return (
        <div className="comment-card">
            <p>{review.user.username} says</p>
            <p>{review.content}</p>
            
            {review.stars === 1 ? "🌟" : null}
            {review.stars === 2 ? "🌟🌟" : null}
            {review.stars === 3 ? "🌟🌟🌟" : null}
            {review.stars === 4 ? "🌟🌟🌟🌟" : null}
            {review.stars === 5 ? "🌟🌟🌟🌟🌟" : null}
            <br />
            {currentUser ? currentUser.id === review.user_id ? <div className="btn-container"><button className="edit-btn" onClick={() => handleEditButtonClick(review)}>Edit 📝📝📝</button><br /><button className="delete-btn" onClick={() => handleDelete(review)}>Delete 💣💣💣</button></div> : null : null}


        </div>
    )
}

export default FestivalReviewCard