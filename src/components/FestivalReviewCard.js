import React from 'react'
import ReactStars from "react-rating-stars-component";
import festival from '../redux/festival';
import './styles/FestivalReviewCard.css'

function FestivalReviewCard({ festival, handleDelete, handleEditButtonClick, currentUser, review, stars, setStars }) {
    
    return (
        <div className="comment-card">
            <p>{review.content}</p>
            
            {review.stars === 1 ? "🌟" : null}
            {review.stars === 2 ? "🌟🌟" : null}
            {review.stars === 3 ? "🌟🌟🌟" : null}
            {review.stars === 4 ? "🌟🌟🌟🌟" : null}
            {review.stars === 5 ? "🌟🌟🌟🌟🌟" : null}
            <br />
            {currentUser ? currentUser.id === review.user_id ? <div className="btn-container"><button className="edit-btn" onClick={() => handleEditButtonClick(review)}>📝📝📝</button><br /><button className="delete-btn" onClick={() => handleDelete(review)}>💣💣💣</button></div> : null : null}


        </div>
    )
}

export default FestivalReviewCard