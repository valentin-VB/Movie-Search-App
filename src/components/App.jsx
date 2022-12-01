import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { StyledNavLink } from './StyledNavLink/StyledNavLink';
import Cast from './Cast';
import Loader from './Reusable Components/Loader';
import Reviews from './Reviews';

const Home = lazy(() => import('../pages/Home/Home'));
const Movies = lazy(() => import('../pages/Movies/Movies'));
const MovieDetails = lazy(() => import('../pages/MovieDetails/MovieDetails'));

export const App = () => {
  return (
    <>
      <nav>
        <StyledNavLink to="/">Home </StyledNavLink>
        <StyledNavLink to="/movies">Movies</StyledNavLink>
      </nav>
      <div>
        <Suspense fallback={<Loader></Loader>}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/movies" element={<Movies />}></Route>
            <Route path="/movies/:movieId" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />}></Route>
              <Route path="reviews" element={<Reviews />}></Route>
            </Route>
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};
