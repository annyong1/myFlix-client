import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  async function fetchMovies() {
    try {
      const fetchedData = await fetch('https://duncanflixdb-4ad2a1debcf7.herokuapp.com/movies');
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
    fetchMovies();
  }, []);

  // Uncomment the following sections if you need to use them
  // if (selectedMovie) {
  //   return (
  //     <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
  //   );
  // }

  // if (movies.length === 0) {
  //   return <div>The list is empty!</div>;
  // }

  console.log(movies);

  return (
    <div>
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
