import React, { useEffect, useState } from 'react'
import FestieCard from './FestieCard'

import './styles/FestieFinder.css'

function FestieFinder() {
    const [festies, setFesties] = useState([])
    const [search, setSearch] = useState("")

    function handleSearchChange(newSearch){
        setSearch(newSearch)
    }
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users`)
        .then(r => r.json())
        .then(festieObjs => {
            setFesties(festieObjs)
        })
    },[])

    const displayedFesties = festies.filter(festie => festie.username.toLowerCase().includes(search.toLowerCase()))
    
    const mappedFesties = displayedFesties.map(festie => {
        return <FestieCard key={festie.id} festie={festie} />
    })
    
    return (
        <div className="fest-friends-container">
            <h1 className="find-your-festies">Find your Festies</h1>
            <div className="festie-card-container">
            <div class="search-container">
                <input 
                    placeholder='Search...'
                    className='fest-search'
                    type="text"
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
                <div class="search"></div>
            </div>
                {mappedFesties}
            </div>
        </div>
    )
}

export default FestieFinder