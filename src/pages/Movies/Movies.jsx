import Searchbar from 'components/Searchbar';
import { useState, useEffect } from 'react';
import { fetchMovieByQuery } from 'Services/api';
import { useSearchParams } from 'react-router-dom';
import Loader from 'components/Reusable Components/Loader';
import MoviesList from 'components/MoviesList.jsx/MoviesList';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') ?? '';

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await fetchMovieByQuery(searchQuery);
        setMovies(result);
        setLoading(false);
      } catch (error) {
        console.warn(error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleFormSubmit = query => {
    setSearchParams({ query: query });
    setMovies([]);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      {loading ? (
        <Loader></Loader>
      ) : (
        searchQuery !== '' && (
          <MoviesList query={searchQuery} movies={movies}></MoviesList>
        )
      )}
    </>
  );
}

export default Movies;
