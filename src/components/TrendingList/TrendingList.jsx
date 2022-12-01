import { fetchTrendingMovies } from '../../Services/api';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from 'components/Reusable Components/Loader';

function TrendingList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const TrendingMovies = await fetchTrendingMovies();
        setMovies(TrendingMovies);
        setLoading(false);
      } catch (error) {
        console.warn(error);
      }

      // console.log('TrandingMovies', TrandingMovies);
      // console.log('fetchTrendingMovies();', fetchTrendingMovies());
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && <Loader></Loader>}
      <ul>
        {movies.length > 0 &&
          movies.map(movie => (
            <li key={movie.id}>
              <NavLink to={`/movies/${movie.id}`}>{movie.title}</NavLink>
            </li>
          ))}
      </ul>
    </>
  );
}
export default TrendingList;
