import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, onBackClick }) => {
  
  const { movieId } = useParams();  
  const movie = movies.find((b) => b._id === movieId);

  if(!movie) {
    return <div>Movie not found</div>;
  }
    
  return (
      <div>
        <div>
          <img className="w-100" src={movie.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
        <Link to={'/'}>
          <button className="back-button">Back</button>
        </Link>
      </div>
    );
  };