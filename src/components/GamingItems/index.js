import './index.css'
import {Link} from 'react-router-dom'

const GamingItems = props => {
  const {item} = props
  const {id, title} = item
  return (
    <li>
      <Link to={`videos/${id}`} className="link">
        <div className="trendingVideoItemCont">
          <img
            src={item.thumbnail_url}
            alt="video thumbnail"
            className="gamingVideo"
          />
          <div className="homeVideoProfCont">
            <div>
              <p>{title}</p>
              <p>{item.view_count}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default GamingItems
