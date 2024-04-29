import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Godfather",
      image:
        "https://goldenglobes.com/wp-content/uploads/2023/10/godfather.jpg",
      director: "Francis Ford Coppola",
    },
    {
      id: 2,
      title: "GoodFellas",
      image:
        "https://eportfolios.macaulay.cuny.edu/seminars/rosenberg09/wiki/images/7/7b/Goodfellas.jpg",
      director: "Martin Scorsese",
    },
    {
      id: 3,
      title: "Casino",
      image:
        "https://d3tvwjfge35btc.cloudfront.net/Assets/45/835/L_p1003983545.jpg",
      director: "Martin Scorsese",
    },
    {
      id: 4,
      title: "Scarface",
      image:
        "https://www.aestheticwalldecor.com/cdn/shop/files/scarface-say-hello-to-my-little-friend-movie-poster-aesthetic-wall-decor.jpg",
      director: "Brian De Palma",
    },
    {
      id: 5,
      title: "The Irishman",
      image:
        "https://en.wikipedia.org/wiki/File:The_Irishman_poster.jpg",
      director: "Martin Scorsese",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
