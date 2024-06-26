import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView} from "../signup-view/signup-view"
import Row from "react-bootstrap/Row";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  async function fetchMovies(token) {
    try {
      const fetchedData = await fetch("https://duncanflixdb-4ad2a1debcf7.herokuapp.com/movies", {
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
      <Row className="justify-content-md-center">
        {!user ? (
          <Col className="mb-5" md={5}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }} 
            />
            or
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col className="mb-5" md={8}>
            <MovieView
              style={{ border: "1px solid green"}}
              book={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
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
        )}
      </Row>
    );
  };

  return (
    <div>
      <button    
        onClick={() => {
          setUser(null);
          setToken(null);
        }}
      >
        Logout
      </button>
      {movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        movies.map((movie) => (
          <MovieCard 
            key={movie._id} 
            movie={movie} 
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }} 
          />
        ))
      )}
    </div>
  );
};

export default MainView;