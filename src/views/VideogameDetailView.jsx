import { Link, useParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import { useVideogameDetailViewModel } from '../viewmodels/VideogameDetailViewModel'

function VideogameDetailView() {
  const { gameId } = useParams()
  const { game, status, error } = useVideogameDetailViewModel(gameId)

  return (
    <section className="page">
      <Link className="back-link" to="/">
        Back to list
      </Link>

      {status === 'loading' && <LoadingState label="Loading game details..." />}
      {status === 'error' && <ErrorState message={error} />}

      {status === 'success' && game && (
        <article className="detail">
          <div className="detail__media">
            {game.backgroundImage ? (
              <img src={game.backgroundImage} alt={game.name} />
            ) : (
              <div className="detail__placeholder">No image available</div>
            )}
          </div>
          <div className="detail__content">
            <h1>{game.name}</h1>
            <div className="detail__meta">
              <span>Rating: {game.rating || 'N/A'}</span>
              <span>Released: {game.released || 'Unknown'}</span>
            </div>
            <div className="detail__chips">
              {game.genreNames.map((genre) => (
                <span className="chip" key={genre}>
                  {genre}
                </span>
              ))}
            </div>
            <p className="detail__description">
              {game.description || 'No description available.'}
            </p>
            {game.platformNames.length > 0 && (
              <div className="detail__platforms">
                <h2>Available on</h2>
                <ul>
                  {game.platformNames.map((platform) => (
                    <li key={platform}>{platform}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </article>
      )}
    </section>
  )
}

export default VideogameDetailView
