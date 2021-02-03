import React, { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component'

function ProfileReviewCard({ review }) {
    const [festival, setFestival] = useState({})

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/festivals/${review.festival_id}`)
        .then(r => r.json())
        .then(setFestival)
    }, [review.festival_id])
    
    
    return (
        <div>
            <img src={festival.image} alt={festival.name} />
            <p>{festival.name}</p>
            <p>{review.content}</p>
            <ReactStars
                value={review.stars}
                classNames="stars-review-card"
                edit={false}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
            />
        </div>
    )
}

export default ProfileReviewCard