import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView} from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  async function fetchMovies(token) {
    try {
      const fetchedData = await fetch("https://duncanflixapi-2df251ca79e4.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!fetchedData.ok) {
        throw new Error(`HTTP error! status: ${fetchedData.status}`);
      }
      const jsonData = await fetchedData.json();
      const movies = jsonData.map((doc) => {
        return {
          _id: doc._id,
          title: doc.Title,
          description: doc.Description,
          genre: {
            name: doc.Genre.Name,
            description: doc.Genre.Description
          },
          director: {
            name: doc.Director.Name,
            bio: doc.Director.Bio,
            birth: doc.Director.Birth
          },
          imagepath: doc.ImagePath,
          actors: doc.Actors
        };
      });

      setMovies(movies);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!token) {
      return;
    }
    fetchMovies(token);
  }, [token]);

  console.log(movies);

  if (!user) {
    return (
      <BrowserRouter>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
          }}
        />
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                !user ? (
                  <Navigate to="/" />
                ) : (
                  <Col className="mb-5" md={5}>
                    <SignupView />
                  </Col>
                )
              }
            />
            <Route
              path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }} 
                  />  
                </Col>                
              )
            }
          />  
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <Col className="mb-5" md={8}>
                  <MovieView/>
                </Col>
              ) 
            }
          />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  {movies.map((movie) => (
                    <Col className="mb-4" key={movie.id} md={3}>
                      <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                          setSelectedMovie(newSelectedMovie);
                        }}
                      />
                    </Col>
                  ))}
                </>
              )            
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
}
}

export default MainView;