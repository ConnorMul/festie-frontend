import React, { useEffect, useState } from 'react'
import './styles/PostCard.css'

function PostCard({ post }) {
    const [user, setUser] = useState()
    const [festival, setFestival] = useState()

    useEffect(() => {
        if(post.user) {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${post.user.id}`)
            .then(r => r.json())
            .then(setUser)
        } else {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${post.user_id}`)
            .then(r => r.json())
            .then(setUser)
        }
    },[])

    useEffect(() => {
        if(post.festival) {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/festivals/${post.festival.id}`)
            .then(r => r.json())
            .then(setFestival)
        } else {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/festivals/${post.festival_id}`)
            .then(r => r.json())
            .then(setFestival)
        }
    },[])

    return ( 
        <div className="post-card">
            <img src={post.image} alt={post.name} className="post-image"/>
            <p>{post.caption}</p>
            <p>Taken by {user ? user.username : null} at {festival ? festival.name : null}</p>
        </div>
    
    )
}

export default PostCard