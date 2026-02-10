import { Link } from 'react-router-dom'

function VideogameCard({ game }) {
  return (
    <article className="game-card">
      <Link to={`/games/${game.id}`} className="game-card__link">
        <div className="game-card__media">
          {game.backgroundImage ? (
            <img src={game.backgroundImage} alt={game.name} />
          ) : (
            <div className="game-card__placeholder">No image</div>
          )}
        </div>
        <div className="game-card__body">
          <h3>{game.name}</h3>
          <p className="game-card__meta">
            Rating: {game.rating || 'N/A'}
            <span className="game-card__separator">•</span>
            Released: {game.released || 'Unknown'}
          </p>
          <div className="game-card__chips">
            {game.genreNames.slice(0, 3).map((genre) => (
              <span key={genre} className="chip">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  )
}

export default VideogameCard
