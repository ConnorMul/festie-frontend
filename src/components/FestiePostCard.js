import React from 'react'

function FestiePostCard({ post }) {

    return (
        <div className="post-card">
            <img src={post.image} alt={post.festival.name} className="post-image"/>
            <p>{post.festival.name}</p>
        </div>
    )
}

export default FestiePostCard