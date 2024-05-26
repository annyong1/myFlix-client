import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  console.log(movies);

  async function fetchMovies() {
		try {
      const fetchedData = await fetch('https://duncanflixdb-4ad2a1debcf7.herokuapp.com/movies');
      if (!fetchedData.ok) {
        throw new Error(`HTTP error! status: ${fetchedData.status}`);
      }
      console.log(fetchedData);
			const jsonData = await fetchedData.json();
			const movies = jsonData.map((doc) => {
        return {
                    _id: doc._id,
                    title: doc.title,
                    description: doc.description,
                    genre: {
                      name: doc.genre.name,
                      description: doc.genre.description
                    },
                    director: {
                      name: doc.director.name,
                      bio: doc.director.bio,
                      birth: doc.director.birth
                    },
                    imagepath: doc.imagepath,
                    actors: doc.actors
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


  // useEffect(() => {
  //   fetch("https://duncanflixdb-4ad2a1debcf7.herokuapp.com/movies")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     const moviesFromApi = data.map((movie) => {
  //       return {
  //           _id: doc._id,
  //           title: doc.title,
  //           description: doc.description,
  //           genre: {
  //             name: doc.genre.name,
  //             description: doc.genre.description
  //           },
  //           director: {
  //             name: doc.director.name,
  //             bio: doc.director.bio,
  //             birth: doc.director.birth
  //           },
  //           imagepath: doc.imagepath,
  //           actors: doc.actors
  //       };
  //     });

  //     setMovies(moviesFromApi);
  //   });
  // }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
