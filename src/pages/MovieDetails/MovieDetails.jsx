import { NavLink, useParams, Outlet, useLocation } from 'react-router-dom';
import { fetchConfig, fetchMovieDetails } from 'Services/api';
import { useState, useEffect } from 'react';
import { Box } from 'components/Reusable Components/Box';
import Loader from 'components/Reusable Components/Loader';
import { StyledNavLink } from 'components/StyledNavLink/StyledNavLink';

function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState(null);
  const { movieId } = useParams();

  const location = useLocation();
  console.log('location', location);
  const backLinkHref = location.state?.from ?? '/movies';

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        setMovieDetails(movieDetails);
        setLoading(false);
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
      {loading && <Loader></Loader>}
      <NavLink to={backLinkHref}>Back to Movies</NavLink>
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
      <StyledNavLink to="cast">Cast</StyledNavLink>
      <StyledNavLink to="reviews">Reviews</StyledNavLink>
      <Outlet context={[movieDetails, config]} />
    </>
  );
}

export default MovieDetails;
