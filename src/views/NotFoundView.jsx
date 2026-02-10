import { Link } from 'react-router-dom'

function NotFoundView() {
  return (
    <section className="page">
      <div className="page__intro">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="lead">
          The page you are looking for does not exist. Use the link below to
          return to the catalog.
        </p>
        <Link className="primary-button" to="/">
          Go to home
        </Link>
      </div>
    </section>
  )
}

export default NotFoundView
