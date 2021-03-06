import React, { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'
import './styles/Reviews.css'

function ProfileReviewCard({ review, handleDelete, handleEditReviewButtonClick }) {
    const [festival, setFestival] = useState({})

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/festivals/${review.festival_id}`)
        .then(r => r.json())
        .then(setFestival)
    }, [review.festival_id])

  
    
    
    return (
        <div className="profile-review-card">
            <div className="fest-details">
                <img src={festival.image} alt={festival.name} />
                <p>{festival.name}</p>
                <p className="review-content">{review.content}</p>
                    {review.stars === 1 ? "🌟" : null}
                    {review.stars === 2 ? "🌟🌟" : null}
                    {review.stars === 3 ? "🌟🌟🌟" : null}
                    {review.stars === 4 ? "🌟🌟🌟🌟" : null}
                    {review.stars === 5 ? "🌟🌟🌟🌟🌟" : null}
                    <br />
                    <br />
                <button className="delete-review-btn" onClick={() => handleEditReviewButtonClick(review)}>Edit 📝📝📝</button>
                <br />
                <button className="delete-review-btn" onClick={() => handleDelete(review)}>Delete 💣💣💣</button>
            </div>
        </div>
    )
}

export default ProfileReviewCard