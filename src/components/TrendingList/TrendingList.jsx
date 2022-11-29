import { fetchTrendingMovies } from '../../Services/api';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TrendingList() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const TrendingMovies = await fetchTrendingMovies();
      setMovies(TrendingMovies);
      // console.log('TrandingMovies', TrandingMovies);
      // console.log('fetchTrendingMovies();', fetchTrendingMovies());
    };

    fetchData();
  }, []);

  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <NavLink to={`/movies/${movie.id}`}>{movie.title}</NavLink>
        </li>
      ))}
    </ul>
  );
}
export default TrendingList;
