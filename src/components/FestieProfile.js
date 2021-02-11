import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FestiePostCard from './FestiePostCard'
import PostCard from './PostCard'
import './styles/FestieFinder.css'

function FestieProfile() {
    const [festie, setFestie] = useState()
    
    const params = useParams()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${params.id}`)
        .then(r => r.json())
        .then(userObj => {
            setFestie(userObj)
            console.log(userObj)
        })
    }, [params.id])
    
    // const festNames = festie.favorites.map(fav => console.log(fav))
//    console.log(festie.posts)
    
    return (
        <div className="festie-profile-container">
            <h1 className="feed-title">{festie ? festie.username : null}'s Feed</h1>
            <div className="likes-container">
            {festie ?
            festie.posts.map(post => <FestiePostCard key={post.id} post={post}/>)
            : null}
            </div>
        </div>
    )
}

export default FestieProfile