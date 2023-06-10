import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoMdClose} from 'react-icons/io'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import LeftHeader from '../LeftHeader'
import HomeVideoItems from '../HomeVideoItems'
import watchAppContext from '../../Context/isDarkLightContext'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    search: '',
    searchText: '',
    bannerHide: false,
    fetchedData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {searchText, fetchedData} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchText}`
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

  onCloseBanner = () => {
    this.setState({bannerHide: true})
  }

  onSearchChange = event => {
    this.setState({search: event.target.value})
  }

  renderFetchedData = () => {
    const {fetchedData} = this.state
    return (
      <ul className="homeList">
        {fetchedData.map(eachItem => (
          <HomeVideoItems key={eachItem.id} item={eachItem} />
        ))}
      </ul>
    )
  }

  onRetry = () => {
    this.setState({apiStatus: apiStatusConstants.loading}, this.fetchData)
  }

  renderFailure = () => (
    <div className="failCont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
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

  onSearchStart = () => {
    const {search} = this.state
    this.setState({search: '', searchText: search}, this.fetchData)
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoVideos = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        className="noVideos"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderHomeOutput = () => {
    const {apiStatus, fetchedData} = this.state
    console.log(fetchedData)
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoading()
      case apiStatusConstants.success:
        if (fetchedData.length === 0) {
          return this.renderNoVideos()
        }
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
                <div className={`homeRoute ${bgClass}`} data-testid="home">
                  {!bannerHide ? (
                    <div className="banner" data-testid="banner">
                      <div>
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="logo"
                          className="homeLogo"
                        />
                        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                        <button type="button">GET IT NOW</button>
                      </div>
                      <button
                        type="button"
                        onClick={this.onCloseBanner}
                        data-testid="close"
                        className="closeBtn"
                      >
                        <IoMdClose />
                      </button>
                    </div>
                  ) : null}
                  <div>
                    <input
                      type="search"
                      value={search}
                      placeholder="Search"
                      onChange={this.onSearchChange}
                    />
                    <button
                      type="button"
                      data-testid="searchButton"
                      onClick={this.onSearchStart}
                    >
                      <AiOutlineSearch />
                    </button>
                  </div>
                  {this.renderHomeOutput()}
                </div>
              </div>
            </div>
          )
        }}
      </watchAppContext.Consumer>
    )
  }
}
export default Home
