import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoMdClose} from 'react-icons/io'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import LeftHeader from '../LeftHeader'
import GamingItems from '../GamingItems'
import watchAppContext from '../../Context/isDarkLightContext'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Gaming extends Component {
  state = {
    fetchedData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/gaming`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        fetchedData: data.videos,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFetchedData = () => {
    const {fetchedData} = this.state
    return (
      <>
        <h1>Gaming</h1>
        <ul className="gamesList">
          {fetchedData.map(eachItem => (
            <GamingItems key={eachItem.id} item={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  onRetry = () => {
    this.setState({apiStatus: apiStatusConstants.loading}, this.fetchData)
  }

  renderFailure = () => (
    <div className="failCont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="theme"
        className="failureHome"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble to complete your request</p>
      <p>Please try again</p>
      <button type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderGamingOutput = () => {
    const {apiStatus, fetchedData} = this.state
    console.log(fetchedData)
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoading()
      case apiStatusConstants.success:
        return this.renderFetchedData()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {search, bannerHide} = this.state
    return (
      <watchAppContext.Consumer>
        {value => {
          const {isDark} = value
          const bgClass = isDark ? 'dark' : 'white'
          return (
            <div>
              <Header />
              <div className="midMain">
                <LeftHeader />
                <div
                  className={`trendingRoute ${bgClass}`}
                  data-testid="gaming"
                >
                  {this.renderGamingOutput()}
                </div>
              </div>
            </div>
          )
        }}
      </watchAppContext.Consumer>
    )
  }
}
export default Gaming
