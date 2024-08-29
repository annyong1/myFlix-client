import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export const MovieView = ({ movies, onBackClick }) => {
	const { movieId } = useParams();
	const movie = movies ? movies.find((b) => b._id === movieId) : null;

	if (!movie) {
		return <div>Movie not found</div>;
	}

	return (
		<div>
			<div>
				<img className='w-100' src={movie.imagepath} alt={movie.title} />
			</div>
			<div>
				<span>
					<strong>Title:</strong>{' '}
				</span>
				<span>{movie.title}</span>
			</div>
			<div>
				<span>
					<strong>Genre:</strong>{' '}
				</span>
				<span>{movie.genre.name}</span>
			</div>
			<div>
				<span>
					<strong>Description:</strong>{' '}
				</span>
				<span>{movie.description}</span>
			</div>
			<div>
				<span>
					<strong>Director:</strong>{' '}
				</span>
				<span>{movie.director.name}</span>
				<div>
					<span>
						<strong>Actors:</strong>{' '}
					</span>
					<span>{movie.actors.join(', ')}</span>
				</div>
			</div>
			<Link to={'/'}>
				<button className='back-button'>Back</button>
			</Link>
		</div>
	);
};
