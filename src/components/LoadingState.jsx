function LoadingState({ label }) {
  return (
    <div className="status" role="status" aria-live="polite">
      <div className="status__spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}

export default LoadingState
