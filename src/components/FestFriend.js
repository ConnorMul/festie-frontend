import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PostCard from './PostCard'
import './styles/FestFriend.css'

function FestFriend({ currentUser }) {
    const [posts, setPosts] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        image: {},
        // caption: "",
        user_id: null,
        festival_id: null
    })

    const festivals = useSelector(state => state.festival.fests)
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`)
        .then(r => r.json())
        .then(setPosts)
    },[])

    function handleChange(e) {
        setFormData({...formData, 
            festival_id: parseInt(e.target.value),
            user_id: currentUser.id,
            user: currentUser,
            festival: festivals.find(festival => festival.id === parseInt(e.target.value))
        })
    }

    const mappedOptions = festivals.map(festival => {
        return <option key={festival.id} value={festival.id}>{festival.name}</option>
    })

    const mappedPosts = posts.map(post => {
        return <PostCard key={post.id} post={post}/>
    })

    function handleSubmit(e) {
        e.preventDefault()

        const form = new FormData()
        form.append("image", formData.image)
        form.append("user_id", formData.user_id)
        form.append("festival_id", formData.festival_id)
        
        fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`, {
            method: "POST",

            body: form
        })
        .then(r => r.json())
        .then(postObj => {

            console.log(postObj)
            setPosts([...posts, postObj])
            setFormData({
                image: null,
                // caption: "",
                user_id: null,
                festival_id: null
            })
            setShowForm(false)
        })
    }

    function handleFileAdd(e) {
        e.persist()
        setFormData({...formData, image: e.target.files[0]})
    }

    return (
        <div className="fest-friend-container">
            <h1 className="festiefeed-title">This is FestieFeed! Users can post their fest pics here</h1>
            <h1 className="festiefeed-post-btn"><button className="add-to-feed-btn" onClick={() => setShowForm(!showForm)}>Post your own!</button></h1>
            {showForm ? 
            <div className="festiefeed-box-container">
            <div className="festiefeed-box">
            <form onSubmit={handleSubmit} className="add-post-form">
                <label>Provide a link to your image!</label><br />
                <input 
                    type="file"
                    name="image"
                    className="file"
                    onChange={handleFileAdd}
                    required
                />
                {/* <br />
                <br />
                <label>Caption it!</label>
                <br />
                <input 
                    type="text"
                    value={formData.caption}
                    onChange={(e) => setFormData({...formData, caption: e.target.value})}
                    required
                /> */}
                <br />
                <br />
                <label>What Festival did you take this at?</label>
                <br />
                <select className="select" onChange={handleChange}>
                <option value="" disabled selected>Select a Fest</option>
                    {mappedOptions}
                </select>
                <br />
                <br />
                <div className="btn-animed">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                        <button className="login-submit-btn">Post</button>
                </div>
            </form>
            </div>
            </div>
            : null}
            {mappedPosts}
        </div>
    )
}

export default FestFriend