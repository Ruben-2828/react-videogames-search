function ErrorState({ message }) {
  return (
    <div className="status status--error" role="alert">
      <p>{message || 'Something went wrong. Please try again.'}</p>
    </div>
  )
}

export default ErrorState
