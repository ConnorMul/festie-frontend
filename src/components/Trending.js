import React, { useEffect } from 'react'
import './styles/Trending.css'
import TrendingFestivalCard from './TrendingFestivalCard'

function Trending({ currentUser, favorites, setFavorites, trending, setTrending, setFavoritesLength }) {

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/festivals`)
        .then(r => r.json())
        .then(festivalObjs => {
            setTrending(festivalObjs.filter(festival => festival.average_star_rating > 0))
        })
    },[])



    const sortedFestivals = trending.sort((fest1, fest2) => fest2.average_star_rating - fest1.average_star_rating).slice(0, 8)
    .map(festival => {
        const favorite = favorites.find(fav => fav.festival_id === festival.id)
        return <TrendingFestivalCard key={festival.id} festival={festival} currentUser={currentUser} favorite={favorite} favorites={favorites} setFavorites={setFavorites} setFavoritesLength={setFavoritesLength}/>
    })

    console.log(sortedFestivals)
    return (
        <div className="trending-container">
            <h1 className="trending-title">Talk about a killer set!</h1>
            <h1 className="trending-title">These fests are top rated among our users</h1>
            {sortedFestivals}
        </div>
    )
}

export default Trending