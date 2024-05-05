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
        "https://a.ltrbxd.com/resized/film-poster/5/1/3/8/3/51383-goodfellas-0-1000-0-1500-crop.jpg",
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
        "https://upload.wikimedia.org/wikipedia/en/8/80/The_Irishman_poster.jpg",
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
