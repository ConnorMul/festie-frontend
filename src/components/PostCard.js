import React from 'react'
import './styles/PostCard.css'

function PostCard({ post }) {
    return ( 
        <div className="post-card">
            <img src={post.image} alt={post.name} className="post-image"/>
            <p>{post.caption}</p>
            <p>Taken by {post.user.username} at {post.festival.name}</p>
        </div>
    
    )
}

export default PostCard