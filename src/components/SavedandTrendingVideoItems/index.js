import './index.css'
import {Link} from 'react-router-dom'

const SavedandTrendingVideoItems = props => {
  const {item} = props
  const {id, title, channel} = item
  return (
    <li>
      <Link to={`videos/${id}`} className="link">
        <div className="trendingVideoItemCont">
          <img
            src={item.thumbnail_url}
            alt="video thumbnail"
            className="trendingVideo"
          />
          <div className="homeVideoProfCont">
            <div>
              <p>{title}</p>
              <p>{channel.name}</p>
              <div className="viewsCont">
                <p>{item.view_count}</p>
                <p>{item.published_at}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default SavedandTrendingVideoItems
