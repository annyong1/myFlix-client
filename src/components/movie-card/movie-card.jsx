import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export const MovieCard = ({
	user,
	movie,
	handleAddToFavorites,
	handleRemoveFromFavorites,
}) => {
	const usersFavoriteMovies = user.FavoriteMovies.map((movie) => movie);
	function isMovieAFavorite() {
		return usersFavoriteMovies.includes(movie._id);
	}

	return (
		<Card className='h-100'>
			<Card.Img variant='top' src={movie.imagepath} />
			<Card.Body>
				<Card.Title>{movie.title}</Card.Title>
				<Link to={`/movies/${encodeURIComponent(movie._id)}`}>
					<Button variant='link'>Open</Button>
				</Link>
				{isMovieAFavorite() ? (
					<Button
						variant='danger'
						onClick={() => handleRemoveFromFavorites(movie)}>
						Remove from Favorites
					</Button>
				) : (
					<Button variant='primary' onClick={() => handleAddToFavorites(movie)}>
						Add to Favorites
					</Button>
				)}
			</Card.Body>
		</Card>
	);
};

export default MovieCard;
