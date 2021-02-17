import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FestiePostCard from './FestiePostCard'
// import ProfileReviewCard from './ProfileReviewCard'
import './styles/FestieFinder.css'

function FestieProfile() {
    const [festie, setFestie] = useState()
    
    const params = useParams()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${params.id}`)
        .then(r => r.json())
        .then(userObj => {
            setFestie(userObj)
        })
    }, [params.id])
    
    
    
    return (
        <div className="festie-profile-container">
            <div className="feed-container">
                <h1 className="feed-title">{festie ? festie.username : null}'s Feed</h1>
                <div className="likes-container">
                    {festie ?
                    festie.posts.map(post => <FestiePostCard key={post.id} post={post}/>)
                    : null}
                </div>
            </div>
        </div>
    )
}

export default FestieProfile