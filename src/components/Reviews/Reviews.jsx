import { useOutletContext } from 'react-router-dom';

function Reviews() {
  const [movieDetails] = useOutletContext();
  const reviews = movieDetails.reviews.results;
  console.log('reviews', reviews);

  if (reviews.length === 0) {
    return <h1>No review for this Movie yet</h1>;
  }

  return (
    <ul>
      {reviews.map(review => (
        <li>
          <h3>{review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default Reviews;
