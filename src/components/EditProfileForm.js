import React from 'react'
import { useHistory } from 'react-router-dom'
import './styles/Profile.css'

function EditProfileForm({ currentUser, setCurrentUser, editProfileFormData, setEditProfileFormData }) {
    
    const history = useHistory()
    
    function handleSubmit(e, userToUpdate) {
        e.preventDefault()

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${userToUpdate.id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editProfileFormData)
        })
        .then( r=> r.json())
        .then(newUserObj => {
            console.log(newUserObj)
            setCurrentUser(newUserObj)
            history.push('/profile')
        })
    }
    
    
    return (
        <div className="edit-profile-form-container">
            <div className="edit-profile-form-box">
            <form onSubmit={(e) => handleSubmit(e, currentUser)} className="edit-profile-form">
            <div className="user-box">
                <input 
                    value={editProfileFormData.username}
                    onChange={(e) => setEditProfileFormData({...editProfileFormData, username: e.target.value })}
                />
                <label>New Username</label>
            </div>
            <div className="user-box">
                
                <input 
                    value={editProfileFormData.email}
                    onChange={(e) => setEditProfileFormData({...editProfileFormData, email: e.target.value })}
                />
                <label>New Email</label>
            </div>
                <button>Save Changes</button>
            </form>
            </div>
        </div>
    )
}

export default EditProfileForm