import { useOutletContext } from 'react-router-dom';

function Cast() {
  const [movieDetails, config] = useOutletContext();
  const cast = movieDetails.credits.cast;
  console.log('cast', cast);
  return (
    <ul>
      {cast.map(actor => (
        <li key={actor.id}>
          <img
            width={100}
            src={`${config.base_url}${config.profile_sizes[2]}${actor.profile_path}`}
            alt=""
          />
          <p>{actor.name}</p>
          <p>{`Character: ${actor.character}`}</p>
        </li>
      ))}
    </ul>
  );
}

export default Cast;
