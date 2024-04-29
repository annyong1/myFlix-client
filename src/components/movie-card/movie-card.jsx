export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(book);
        }}
      >
        {movie.title}
      </div>
    );
  };
  