import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { useParams } from 'react-router-dom'
import FestivalReviewCard from './FestivalReviewCard'
import './styles/FestReviewForm.css'

function FestReviewForm({ reviews, setReviews, handleDelete, currentUser }) {
    const [festival, setFestival] = useState()
    const [formData, setFormData] = useState({
        content: "",
        stars: 0
    })

    const params = useParams()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/festivals/${params.id}`)
        .then(r => r.json())
        .then(festivalObj => {
            setFestival(festivalObj)
            })
        }, [params.id])



    function handleSubmit(e) {
        e.preventDefault()

        currentUser ?
        fetch(`${process.env.REACT_APP_API_BASE_URL}/reviews/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...formData,
                festival_id: festival.id,
                user_id: currentUser.id
            
            })
        })
        .then(r => r.json())
        .then(reviewObj => setReviews([...reviews, reviewObj]),
        setFormData({
            content: "",
        stars: 0
        })
        )
        : alert("You must be logged in to review a festival!")
    }

    const ratingChanged = (newRating) => {
        setFormData({...formData, stars: newRating})
    };


    return (
        <div className="fest-review-form-container">
            <div className="comment-section">
                <h1>Here's what others are saying about</h1>
                <h2>{festival ? festival.name : null}</h2>
                
                {reviews && festival ? reviews.map(review => review.festival_id === festival.id ? <FestivalReviewCard key={review.id} review={review} currentUser={currentUser} handleDelete={handleDelete} festival={festival}/> : null) : null}
            </div>
            
            <div className="form-section">
                <h1 className="review-title">Tell us about {festival ? festival.name : null}</h1>
                <h2 className="review-title">What did ya think? Would ya go again?</h2>
                <h2 className="review-title">Was {festival ? festival.name : null} not for you? Let us know!</h2>
                
                <form className="fest-review-form" onSubmit={handleSubmit}>
                    <label>Your Review</label>
                    <br />
                    <textarea 
                        rows="10"
                        cols="45"
                        required
                        placeholder="This festival was the best time I have ever had, I can't wait to go back next year!"
                        value={formData.content} 
                        onChange={(e) => setFormData({...formData, content: e.target.value})} 
                    />
                    <br />
                    <label>How many stars would you rate {festival ? festival.name : null}?</label>
                    <br />
                    <ReactStars
                        classNames="stars"
                        count={5}
                        value={formData.stars}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                        required
                    />
                    <br />
                    <button className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default FestReviewForm