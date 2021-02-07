import Home from './Home'
import './styles/App.css';
import FestFriend from './FestFriend'
import FestReview from './FestReview';
import Favorites from './Favorites';
import Reviews from './Reviews'
import Login from './Login';
import { Route, Switch, useHistory } from 'react-router-dom';
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


function App() {
  const [currentUser, setCurrentUser] = useState()
  const [reviews, setReviews] = useState([])
  const [favorites, setFavorites] = useState([])
  const [editFormData, setEditFormData] = useState(null)
  const [editProfileFormData, setEditProfileFormData] = useState({})
  
  const dispatch = useDispatch()
  const history = useHistory()
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/festivals`)
    .then(r => r.json())
    .then(festivalObjs => {
      dispatch(addFests(festivalObjs))
      handleLogin()
    })
  }, [dispatch])

  function handleLogin() {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/login`)
      .then((r) => r.json())
      .then(userObj => {
        setCurrentUser(userObj)
        setReviews(userObj.reviews)
        setFavorites(userObj.favorites)
        history.push('/')
      });
  }

  function handleLogout() {
    setCurrentUser(null)
  }

  function handleDelete(reviewToDelete) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/reviews/${reviewToDelete.id}`, {
        method: "DELETE"
    })
    .then(r => r.json())
    .then(deletedReview => {
        setReviews(reviews.filter(review => review.id !== reviewToDelete.id))
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
        onLogin={handleLogin}
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
          />
        </Route>
        <Route exact path="/festivals/trending">
          <Trending
            currentUser={currentUser}
            favorites={favorites}
            setFavorites={setFavorites}
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
          />
        </Route>
        <Route path="/about">
          <About

          />
        </Route>
        <Route exact path="/profile">
          <Profile
            currentUser={currentUser}
            reviews={reviews}
            favorites={favorites}
            handleEditProfileClick={handleEditProfileClick}
          />
        </Route>
        <Route exact path="/profile/edit">
          <EditProfileForm
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            editProfileFormData={editProfileFormData}
            setEditProfileFormData={setEditProfileFormData}
          />
        </Route>
        <Route path="/profile/favorites">
          <Favorites
            handleDeleteFavorite={handleDeleteFavorite}
            currentUser={currentUser}
            reviews={reviews}
            favorites={favorites}
          />
        </Route>
        <Route path="/profile/reviews">
          <Reviews
            currentUser={currentUser}
            reviews={reviews}
            favorites={favorites}
            handleDelete={handleDelete}
            handleEditReviewButtonClick={handleEditReviewButtonClick}
          />
        </Route>
        <Route exact path="/festiefeed">
          <FestFriend
            currentUser={currentUser}
            reviews={reviews}
            favorites={favorites}
          />
        </Route>
        <Route path="/login">
          <Login
            onLogin={handleLogin}
          />
        </Route>
        <Route path="/signup">
          <Signup
            onLogin={handleLogin}
          />
        </Route>
        
        {/* <Route path="*">
          <Redirect to="/" />
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
