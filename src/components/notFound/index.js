import Header from '../Header'
import LeftHeader from '../LeftHeader'
import './index.css'

const notFound = () => (
  <div>
    <Header />
    <div className="midMain">
      <LeftHeader />
      <div className="homeRoute" data-testid="home">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
          alt="not found"
          className="notFound"
        />
        <h1>Page Not Found</h1>
        <p>We are sorry, the page you requested could not be found.</p>
      </div>
    </div>
  </div>
)

export default notFound
