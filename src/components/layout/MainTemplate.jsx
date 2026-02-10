import Footer from './Footer'
import Header from './Header'

function MainTemplate({ children }) {
  return (
    <div className="app-shell">
      <Header />
      <main className="main">
        <div className="container">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

export default MainTemplate
