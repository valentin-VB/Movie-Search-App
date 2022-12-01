import { NavLink, useLocation } from 'react-router-dom';

function MoviesList({ movies, query }) {
  const location = useLocation();
  if (movies.length === 0 && query !== '') {
    return <p>Sorry, no movie found for this search query</p>;
  }
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <NavLink to={`${movie.id}`} state={{ from: location }}>
            {movie.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default MoviesList;
