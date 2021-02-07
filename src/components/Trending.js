import React from 'react'
import { useSelector } from 'react-redux'
import FestivalCard from './FestivalCard'
import './styles/Trending.css'

function Trending({ currentUser, favorite, favorites, setFavorites}) {
    
    const festivals = useSelector(state => state.festival.fests)

    const trendingFests = festivals.filter(festival => festival.average_star_rating > 0)

    const sortedFestivals = trendingFests.sort((fest1, fest2) => fest1.average_star_rating - fest2.average_star_rating)
    .map(festival => <FestivalCard key={festival.id} festival={festival} currentUser={currentUser} favorite={favorite} favorites={favorites} setFavorites={setFavorites}/>)
    return (
        <div className="trending-container">
            <h1 className="trending-title">Talk about a killer set!</h1>
            <h1 className="trending-title">These fests are top rated among our users</h1>
            {sortedFestivals}
        </div>
    )
}

export default Trending