import React from 'react'
import { useSelector } from 'react-redux'
import FestivalCard from './FestivalCard'
import './styles/FestReview.css'
function FestReview({ favorites, setFavorites, currentUser }) {

    const festivals = useSelector(state => state.festival.fests)

    const mappedFestivals = festivals.map(fest => {
        const favorite = favorites.map(fav => fav.festival_id === fest.id)
        return <FestivalCard key={fest.id} festival={fest} currentUser={currentUser} favorite={favorite} favorites={favorites} setFavorites={setFavorites}/>
    })

    return (
        <div className="festival-container">
            <h1 className="fest-container-title">You're in FestHeaven!</h1>
            <h1 className="fest-container-title">Here you can check out a fest and what your festies are saying..</h1>
            <h1 className="fest-container-title">You can also leave your own review for a fest! Click on a lineup to try it out!</h1>
            {mappedFestivals}
        </div>
    )
}

export default FestReview