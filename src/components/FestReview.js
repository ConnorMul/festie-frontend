import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import FestivalCard from './FestivalCard'
import './styles/FestReview.css'
function FestReview({ favorites, setFavorites, currentUser, favoritesLength, setFavoritesLength }) {
    const [search, setSearch] = useState("")
    const festivals = useSelector(state => state.festival.fests)

    function handleSearchChange(newSearch){
        setSearch(newSearch)
    }

    const displayedFests = festivals.filter(fest => fest.name.toLowerCase().includes(search.toLowerCase()))
    
    // const mappedFestivals = displayedFests.map(fest => {
    //     const favorite = favorites.find(fav => fav.festival_id === fest.id)
    //     return <FestivalCard key={fest.id} festival={fest} currentUser={currentUser} favorite={favorite} favorites={favorites} setFavorites={setFavorites} favoritesLength={favoritesLength} setFavoritesLength={setFavoritesLength}/>
    // })

    return (
        <div className="festival-container">
            <h1 className="fest-container-title">You're in FestHeaven!</h1>
            <h1 className="fest-container-title">Check out a Fest and what other festies are saying</h1>
            <h1 className="fest-container-title">and leave your own review for a fest!</h1>
            <div className="search-container">
                <input 
                    placeholder='Search...'
                    className='fest-search'
                    type="text"
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
                <div className="search"></div>
            </div>
            {displayedFests.map(fest => {
                // const favorite = favorites.find(fav => fav.festival_id === fest.id)
                return <FestivalCard key={fest.id} festival={fest} currentUser={currentUser} favorite={favorites ? favorites.find(fav => fav.festival_id === fest.id) : null} favorites={favorites} setFavorites={setFavorites} favoritesLength={favoritesLength} setFavoritesLength={setFavoritesLength}/>
        })
}
        </div>
    )
}

export default FestReview