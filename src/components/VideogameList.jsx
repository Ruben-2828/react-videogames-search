import VideogameCard from './VideogameCard'

function VideogameList({ games, variant = 'card' }) {
  const className = variant === 'list' ? 'game-list' : 'game-grid'

  return (
    <div className={className}>
      {games.map((game) => (
        <VideogameCard key={game.id} game={game} />
      ))}
    </div>
  )
}

export default VideogameList
