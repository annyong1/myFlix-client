import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
        className="movie-card"
      >
        <h2>{movie.title}</h2>
        <img src={movie.imagepath} alt={movie.title} className="movie-image" />
        <p><strong>Description:</strong> {movie.description}</p>
        <p><strong>Genre:</strong> {movie.genre.name} - {movie.genre.description}</p>
        <p><strong>Director:</strong></p>
        <div className="director-details">
          <p><strong>Name:</strong> {movie.director.name}</p>
          <p><strong>Bio:</strong> {movie.director.bio}</p>
          <p><strong>Birth:</strong> {movie.director.birth}</p>
        </div>
        <p><strong>Actors:</strong> {movie.actors.join(", ")}</p>
      </div>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.string.isRequired
    }).isRequired,
    imagepath: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
