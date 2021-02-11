import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PostCard from './PostCard'
import './styles/FestFriend.css'

function FestFriend({ currentUser }) {
    const [posts, setPosts] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        image: "",
        caption: "",
        user_id: 0,
        festival_id: null
    })

    const festivals = useSelector(state => state.festival.fests)
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`)
        .then(r => r.json())
        .then(setPosts)
    },[])

    function handleChange(e) {
        setFormData({...formData, festival_id: parseInt(e.target.value)})
    }

    const mappedOptions = festivals.map(festival => {
        return <option key={festival.id} value={festival.id}>{festival.name}</option>
    })

    const mappedPosts = posts.map(post => {
        return <PostCard key={post.id} post={post}/>
    })

    function handleSubmit(e) {
        e.preventDefault()
        
        fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...formData,
                user_id: currentUser.id
            })
        })
        .then(r => r.json())
        .then(postObj => {

            console.log(postObj)
            setPosts([...posts, postObj])
            setFormData({
                image: "",
                caption: "",
                user_id: 0,
                festival_id: null
            })    
        })
    }

    return (
        <div className="fest-friend-container">
            <h1 className="festiefeed-title">This is FestieFeed! Users can post their fest pics here</h1>
            <h1 className="festiefeed-title">Check out what others are posting and <button className="add-to-feed-btn" onClick={() => setShowForm(!showForm)}>Post your own!</button></h1>
            {showForm ? 
            <div className="festiefeed-box-container">
            <div className="festiefeed-box">
            <form onSubmit={handleSubmit} className="add-post-form">
                <label>Provide a link to your image!</label><br />
                <input 
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    required
                />
                <br />
                <br />
                <label>Caption it!</label>
                <br />
                <input 
                    type="text"
                    value={formData.caption}
                    onChange={(e) => setFormData({...formData, caption: e.target.value})}
                    required
                />
                <br />
                <br />
                <label>What Festival did you take this at?</label>
                <br />
                <select placeholder="Select a Fest" onChange={handleChange}>
                    {mappedOptions}
                </select>
                <br />
                <br />
                <button>Post</button>
            </form>
            </div>
            </div>
            : null}
            {mappedPosts}
        </div>
    )
}

export default FestFriend