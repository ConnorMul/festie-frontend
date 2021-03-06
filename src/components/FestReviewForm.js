import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { useParams } from 'react-router-dom'
import FestivalReviewCard from './FestivalReviewCard'
import './styles/FestReviewForm.css'
import Swal from 'sweetalert2'

function FestReviewForm({ setUserReviews, userReviews, reviewsLength, setReviewsLength, setEditFormData, handleEditButtonClick, editFormData, reviews, setReviews, handleDelete, currentUser }) {
    const [festival, setFestival] = useState()
    const [stars, setStars] = useState(null)
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
            setReviewsLength(festivalObj.reviews.length)
            setReviews(festivalObj.reviews)
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
                festival: festival,
                festival_id: festival.id,
                user_id: currentUser.id
            
            })
        })
        .then(r => r.json())
        .then(reviewObj => {
            setReviews([...reviews, reviewObj])
            setUserReviews([...userReviews, reviewObj])
            setFormData({
                content: "",
                stars: 0
            })
        setReviewsLength(reviewsLength + 1)
        })
        : Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Login to leave a Review!'
          })
    }

    function handleEditSubmit(evt, id) {
        evt.preventDefault()
        
        fetch(`${process.env.REACT_APP_API_BASE_URL}/reviews/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editFormData)
        })
        .then(r => r.json())
        .then(editedComment => {
            const filteredReviews = reviews.filter(review => review.id !== id)
            setStars(editedComment.stars)
            setReviews([...filteredReviews, editedComment])
            const filteredForUser = userReviews.filter(review => review.id !== id)
            setUserReviews([...filteredForUser, editedComment])
            setEditFormData(null)
        })

    }


    const ratingChanged = (newRating) => {
        editFormData ?
        setEditFormData({...editFormData, stars: newRating})
        :
        setFormData({...formData, stars: newRating})
    };


    return (
        <div className="fest-review-form-container">
            <div className="comment-section">
                <h1 className="review-title">Here's what others are saying about</h1>
                <h1 className="review-title">{festival ? festival.name : null}</h1>

                {reviews && festival ? reviews.map(review =>
                <FestivalReviewCard
                    key={review.id}
                    review={review}
                    currentUser={currentUser}
                    handleEditButtonClick={handleEditButtonClick}
                    handleDelete={handleDelete}
                />)
                : null}
                {reviewsLength === 0 ? "No Reviews Yet! Leave one now!" : null}
            </div>

            <div className="form-section">
                <h1 className="review-title">Tell us about {festival ? festival.name : null}</h1>
                <h2 className="review-title">What did you think? Would you go again?</h2>
                <h2 className="review-title">Was {festival ? festival.name : null} not for you? Let us know!</h2>
                <img src={festival ? festival.image : null} alt={festival ? festival.name : null} />
                <form className="fest-review-form" onSubmit={editFormData ? (evt) => handleEditSubmit(evt, editFormData.id) : handleSubmit}>
                    <label>Your Review</label>
                    <br />
                    <textarea 
                        rows="10"
                        cols="45"
                        className="textarea"
                        required
                        placeholder="This festival was the best time I have ever had, I can't wait to go back next year!"
                        value={editFormData ? editFormData.content : formData.content} 
                        onChange={
                            editFormData ?
                            (e) => setEditFormData({...editFormData, content: e.target.value}) 
                            :
                            (e) => setFormData({...formData, content: e.target.value})
                        } 
                    />
                    <br />
                    <br />
                    <label className="star-label">How many stars would you rate {festival ? festival.name : null}?</label>
                    <br />
                    <ReactStars
                        classNames="stars"
                        count={5}
                        value={editFormData ? editFormData.stars : formData.stars}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                        required
                    />
                    <br />
                    <div className="btn-animd">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                       <button className="signup-submit-btn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FestReviewForm