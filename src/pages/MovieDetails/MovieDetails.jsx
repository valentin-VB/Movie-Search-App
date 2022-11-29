import { NavLink, useParams, Outlet } from 'react-router-dom';
import { fetchConfig, fetchMovieDetails } from 'Services/api';
import { useState, useEffect } from 'react';
import { Box } from 'components/Reusable Components/Box';

export function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState(null);

  const [config, setConfig] = useState(null);
  const { movieId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      //   try {
      //     const movie = await fetchMoviebyId(Number(movieId));
      //     setMovie(movie);
      //   } catch (error) {
      //     console.warn(error);
      //   }
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        console.log('movieDetails', movieDetails);
        setMovieDetails(movieDetails);
      } catch (error) {
        console.warn(error);
      }

      try {
        const config = await fetchConfig();
        setConfig(config);
      } catch (error) {
        console.warn(error);
      }
    };

    fetchData();
  }, [movieId]);

  if (movieDetails === null || config === null) {
    return;
  }

  const { title, poster_path, overview, vote_average, genres } = movieDetails;
  return (
    <>
      <Box>
        <div>
          <img
            alt={title}
            src={`${config.base_url}${config.poster_sizes[2]}${poster_path}`}
          />
        </div>
        <Box>
          <h1>{title}</h1>
          <p>
            Average Vote: <span>{vote_average}</span>
          </p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h3>Gener</h3>
          <p>{genres.map(genr => `${genr.name},  `)}</p>
        </Box>
      </Box>
      <NavLink to="cast">Cast</NavLink>
      <NavLink to="reviews">Reviews</NavLink>

      <Outlet context={[movieDetails, config]} />
    </>
  );
}
