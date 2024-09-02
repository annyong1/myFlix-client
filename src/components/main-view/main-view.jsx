import { useState, useEffect, useRef } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  async function getUser() {
    try {
      const response = await fetch(
        `https://duncanflixapi-2df251ca79e4.herokuapp.com/users/${user.Username}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Add movie to users favorite list
  async function handleAddToFavorites(movie) {
    try {
      const response = await fetch(
        `https://duncanflixapi-2df251ca79e4.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return getUser();
    } catch (error) {
      console.log(error);
    }
  }

  const searchBar = useRef(null);
  const movieList = useRef(null);

  useEffect(() => {
    if (searchBar.current && movieList.current) {
      const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        setSearchQuery(searchQuery);
        const filteredMovies = movies.filter((movie) => {
          return movie.title.toLowerCase().includes(searchQuery);
        });
        setFilteredMovies(filteredMovies);
      };
      searchBar.current.addEventListener('input', handleSearch);
      return () => {
        searchBar.current.removeEventListener('input', handleSearch);
      };
    }
  }, [movies]);

  return (
    <Row>
      <Col>
        <input
          type="text"
          ref={searchBar}
          placeholder="Search movies"
          value={searchQuery}
        />
      </Col>
      <Col>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Col className="mb-4" key={movie._id} md={3}>
              <MovieCard
                user={user}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  // handle movie click
                }}
                handleAddToFavorites={() => handleAddToFavorites(movie)}
                handleRemoveFromFavorites={() =>
                  // handle remove from favorites
                  console.log('Remove from favorites')
                }
              />
            </Col>
          ))
        ) : movies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          movies.map((movie) => (
            <Col className="mb-4" key={movie._id} md={3}>
              <MovieCard
                user={user}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  // handle movie click
                }}
                handleAddToFavorites={() => handleAddToFavorites(movie)}
                handleRemoveFromFavorites={() =>
                  // handle remove from favorites
                  console.log('Remove from favorites')
                }
              />
            </Col>
          ))
        )}
      </Col>
    </Row>
  );
};