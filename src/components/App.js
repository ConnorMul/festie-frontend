import Home from './Home'
import './styles/App.css';
import FestReview from './FestReview';
import Favorites from './Favorites';
import Reviews from './Reviews'
import Login from './Login';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import { useEffect, useState } from 'react';
import { addFests } from '../redux/festival';
import { useDispatch } from 'react-redux';
import FestReviewForm from './FestReviewForm';
import About from './About'


function App() {
  const [currentUser, setCurrentUser] = useState()
  const [reviews, setReviews] = useState([])
  const [favorites, setFavorites] = useState([])

  
  const dispatch = useDispatch()
  
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
      });
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

  return (
    <div className="App">
      <NavBar 
        onLogin={handleLogin}
        currentUser={currentUser}
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
        <Route path="/festivals/:id">
          <FestReviewForm
            currentUser={currentUser}
            reviews={reviews}
            setReviews={setReviews}
            handleDelete={handleDelete}
          />
        </Route>
        <Route path="/about">
          <About

          />
        </Route>
        <Route path="/profile/favorites">
          <Favorites
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
          />
        </Route>
        <Route path="/login">
          <Login

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
