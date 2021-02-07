import React from 'react'

import './styles/Profile.css'

function Profile({ currentUser, handleEditProfileClick }) {


    return (
        <div className="edit-profile-container">
            <h1>Hey Bestie!</h1>
            <h1>Here's your profile info we have on file..</h1>
            <h4>Username</h4>
            <p>{currentUser ? currentUser.username : null}</p>
            <h4>Email</h4>
            <p>{currentUser ? currentUser.email : null}</p>
            <button className="edit-profile-btn" onClick={() => handleEditProfileClick(currentUser)}>Change some details</button>
        </div>
    )
}

export default Profile