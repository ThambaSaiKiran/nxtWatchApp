import {Component, React} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player/youtube'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'
import watchAppContext from '../../Context/isDarkLightContext'
import Header from '../Header'
import LeftHeader from '../LeftHeader'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class VideoItemDetails extends Component {
  state = {
    fetchedData: {},
    apiStatus: apiStatusConstants.initial,
    isSaved: false,
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    console.log(id)
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const newData = {...data.video_details, isSaved: false}
    if (response.ok === true) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        fetchedData: newData,
      })
    }
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
      <button type="button">Retry</button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickLike = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  onClickDislike = () => {
    this.setState(prevState => ({
      isLiked: false,
      isDisliked: !prevState.isDisliked,
    }))
  }

  renderFetchedData = () => {
    const {fetchedData, isDisliked, isLiked, isSaved} = this.state
    const {id, title, channel, description} = fetchedData
    const likeContColor = isLiked ? 'blue' : 'normal'
    const disLikeContColor = isDisliked ? 'blue' : 'normal'
    const savedContColor = isSaved ? 'blue' : 'normal'
    return (
      <watchAppContext.Consumer>
        {value => {
          const {savedVideos, addSavedVideos, removeSavedVideos} = value
          const onChangeSave = () => {
            if (isSaved === true) {
              return removeSavedVideos(id)
            }
            return addSavedVideos(fetchedData)
          }
          const onClickSave = () => {
            this.setState({isSaved: !isSaved}, onChangeSave)
          }
          return (
            <div className="videoDetCont1">
              <ReactPlayer
                url={fetchedData.video_url}
                className="VideoDetImg"
              />
              <p>{title}</p>
              <div className="videoDetContViews">
                <div className="videoDetContViews1">
                  <p>{fetchedData.view_count} views</p>
                  <p>{fetchedData.published_at}</p>
                </div>
                <div className="likeCont">
                  <div className={`likeCont1 ${likeContColor}`}>
                    <BiLike className="lIcons" onClick={this.onClickLike} />
                    <button type="button" onClick={this.onClickLike}>
                      Like
                    </button>
                  </div>
                  <div className={`likeCont1 ${disLikeContColor}`}>
                    <BiDislike
                      className="lIcons"
                      onClick={this.onClickDislike}
                    />
                    <button type="button" onClick={this.onClickDislike}>
                      Dislike
                    </button>
                  </div>
                  <div className={`likeCont1 ${savedContColor}`}>
                    <BiListPlus className="lIcons" onClick={onClickSave} />
                    {isSaved ? (
                      <button type="button" onClick={onClickSave}>
                        Saved
                      </button>
                    ) : (
                      <button type="button" onClick={onClickSave}>
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <hr />
              <div className="detCont2">
                <img
                  src={channel.profile_image_url}
                  alt="channel logo"
                  className="prof"
                />
                <div>
                  <p>{channel.name}</p>
                  <p>{channel.subscriber_count}</p>
                  <p>{description}</p>
                </div>
              </div>
            </div>
          )
        }}
      </watchAppContext.Consumer>
    )
  }

  renderVideoItemDetails = () => {
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
    const {fetchedData} = this.state
    console.log(fetchedData)
    return (
      <div>
        <Header />
        <div className="midMain">
          <LeftHeader />
          <div data-testid="videoItemDetails" className="videoItemDetCont">
            {this.renderVideoItemDetails()}
          </div>
        </div>
      </div>
    )
  }
}

export default VideoItemDetails
