import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__content">
        <NavLink to="/" className="site-logo">
          GameShelf
        </NavLink>
        <nav className="site-nav" aria-label="Primary">
          <NavLink to="/" className="site-nav__link">
            Home
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
