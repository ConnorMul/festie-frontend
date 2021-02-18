import Home from './Home'
import './styles/App.css';
import FestFriend from './FestFriend'
import FestReview from './FestReview';
import Favorites from './Favorites';
import Reviews from './Reviews'
import Login from './Login';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import NavBar from './NavBar';
import { useEffect, useState } from 'react';
import { addFests } from '../redux/festival';
import { useDispatch } from 'react-redux';
import FestReviewForm from './FestReviewForm';
import About from './About'
import Profile from './Profile';
import Trending from './Trending';
import EditProfileForm from './EditProfileForm';
import Signup from './Signup';
import FestieFinder from './FestieFinder';
import FestieProfile from './FestieProfile';


function App() {
  const [currentUser, setCurrentUser] = useState()
  const [reviews, setReviews] = useState([])
  const [userReviews, setUserReviews] = useState([])
  const [favorites, setFavorites] = useState([])
  const [editFormData, setEditFormData] = useState(null)
  const [editProfileFormData, setEditProfileFormData] = useState({})
  const [reviewsLength, setReviewsLength] = useState(0)
  const [favoritesLength, setFavoritesLength] = useState(0)
  const [trending, setTrending] = useState([])

  const dispatch = useDispatch()
  const history = useHistory()
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/festivals`)
    .then(r => r.json())
    .then(festivalObjs => {
      dispatch(addFests(festivalObjs))
    })
  }, [dispatch])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/autologin`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(r => r.json())
    .then(user => {
      setCurrentUser(user)
      setFavorites(user.favorites)
      setUserReviews(user.reviews)
    })

  }
  }, [])

  function handleLogout() {
    setCurrentUser(null)
    setFavorites([])
    setReviews([])
    localStorage.removeItem("token")
  }

  function handleDelete(reviewToDelete) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/reviews/${reviewToDelete.id}`, {
        method: "DELETE"
    })
    .then(r => r.json())
    .then(deletedReview => {
        setUserReviews(userReviews.filter(review => review.id !== reviewToDelete.id))
        setReviews(reviews.filter(review => review.id !== reviewToDelete.id))
        setReviewsLength(reviewsLength > 0 ? reviewsLength - 1 : 0)
    })
  }

  function handleEditButtonClick(reviewToEdit) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/reviews/${reviewToEdit.id}`)
    .then(r => r.json())
    .then(reviewObj => {
      setEditFormData(reviewObj)
    })
  }

  function handleDeleteFavorite(favToRemove) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/favorites/${favToRemove.id}`, {
      method: "DELETE",
    })
    .then(r => r.json())
    .then(deletedFav => {
      const filteredFavs = favorites.filter(favorite => favorite.id !== favToRemove.id)
      setFavorites(filteredFavs)
      setFavoritesLength(favoritesLength - 1)
    })
  }

  function handleEditProfileClick(userToUpdate) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${userToUpdate.id}`)
    .then(r => r.json())
    .then(setEditProfileFormData)
    history.push('/profile/edit')
  }

  function handleEditReviewButtonClick(reviewToEdit) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/festivals/${reviewToEdit.festival_id}`)
    .then(r => r.json())
    .then(festivalObj => setEditFormData(reviewToEdit))
    history.push(`/festivals/${reviewToEdit.festival_id}`)
  }

  return (
    <div className="App">
      <NavBar 
        currentUser={currentUser}
        handleLogout={handleLogout}
      />


      <Switch>
        <Route exact path="/">
          <Home

          />
        </Route>
        <Route exact path="/festivals">
          <FestReview
            currentUser={currentUser}
            favorites={favorites}
            setFavorites={setFavorites}
            favoritesLength={favoritesLength}
            setFavoritesLength={setFavoritesLength}
          />
        </Route>
        <Route exact path="/festivals/trending">
          <Trending
            currentUser={currentUser}
            favorites={favorites}
            setFavorites={setFavorites}
            trending={trending}
            setTrending={setTrending}
            setFavoritesLength={setFavoritesLength}
          />
        </Route>
        <Route path="/festivals/:id">
          <FestReviewForm
            currentUser={currentUser}
            setEditFormData={setEditFormData}
            editFormData={editFormData}
            reviews={reviews}
            setReviews={setReviews}
            handleDelete={handleDelete}
            handleEditButtonClick={handleEditButtonClick}
            setReviewsLength={setReviewsLength}
            reviewsLength={reviewsLength}
            setUserReviews={setUserReviews}
            userReviews={userReviews}
          />
        </Route>
        <Route path="/about">
          <About

          />
        </Route>
        <Route exact path="/profile">
          {currentUser ? 
          <Profile
            currentUser={currentUser}
            handleEditProfileClick={handleEditProfileClick}
          />
          : <Redirect to="/login" />
          }
        </Route>
        <Route exact path="/profile/edit">
          {currentUser ?
          <EditProfileForm
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            editProfileFormData={editProfileFormData}
            setEditProfileFormData={setEditProfileFormData}
          />
            : <Redirect to="/login" />
          }
        </Route>
        <Route path="/profile/favorites">
          {currentUser ? 
          <Favorites
            handleDeleteFavorite={handleDeleteFavorite}
            favorites={favorites}
          />
            : <Redirect to="/login" />
          }
        </Route>
        <Route path="/profile/reviews">
          {currentUser ? 
          <Reviews
            userReviews={userReviews}
            handleDelete={handleDelete}
            handleEditReviewButtonClick={handleEditReviewButtonClick}
          />
          : <Redirect to="/login" />
          }
        </Route>
        <Route exact path="/festiefeed">
          {currentUser ? 
          <FestFriend
            currentUser={currentUser}
          />
          : <Redirect to="/login" />
          }
        </Route>
        <Route exact path="/festiefinder">
          <FestieFinder

          />
        </Route>
        <Route exact path="/festiefinder/:id">
          <FestieProfile

          />
        </Route>
        <Route path="/login">
          <Login
            setCurrentUser={setCurrentUser}
            setFavorites={setFavorites}
            setUserReviews={setUserReviews}
          />
        </Route>
        <Route path="/signup">
          <Signup
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Route>
        
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
