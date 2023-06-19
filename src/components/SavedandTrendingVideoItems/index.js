import './index.css'
import {Link} from 'react-router-dom'
import watchAppContext from '../../Context/isDarkLightContext'

const SavedandTrendingVideoItems = props => {
  const {item} = props
  const {id, title, channel} = item
  return (
    <watchAppContext.Consumer>
      {value => {
        const {isDark} = value
        const bgClass = isDark ? 'dark' : 'white'
        return (
          <li className="savedAndTrendingItem">
            <Link to={`videos/${id}`} className="link">
              <div className="trendingVideoItemCont" id="trendingVideoItem">
                <img
                  src={item.thumbnail_url}
                  alt="video thumbnail"
                  className="trendingVideo"
                />
                <div className="trendingVideoProfCont">
                  <div className={bgClass}>
                    <p className="savedTitle">{title}</p>
                    <p className="channelName">{channel.name}</p>
                    <div className="viewsCont">
                      <p className="noOfViews">{item.view_count}</p>
                      <p>{item.published_at}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </watchAppContext.Consumer>
  )
}

export default SavedandTrendingVideoItems
