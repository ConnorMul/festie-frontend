import React from 'react'
import ReactStars from "react-rating-stars-component";
import festival from '../redux/festival';
import './styles/FestivalReviewCard.css'

function FestivalReviewCard({ festival, handleDelete, currentUser, review }) {
    
    return (
        <div className="comment-card">
            <p>{review.content}</p>
            {review.id ? 
            <ReactStars
                value={review.stars}
                classNames="stars-review"
                edit={false}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
            /> : null}
            {currentUser ? currentUser.id === review.user_id ? <div className="btn-container"><button className="delete-btn" onClick={() => handleDelete(review)}>X</button></div> : null : null}
            

        </div>
    )
}

export default FestivalReviewCard