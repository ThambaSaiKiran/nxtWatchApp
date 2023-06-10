import './index.css'
import {Link} from 'react-router-dom'

const HomeVideoItems = props => {
  const {item} = props
  const {id, title, channel} = item
  return (
    <li>
      <Link to={`videos/${id}`} className="link">
        <div className="homeVideoItemCont">
          <img
            src={item.thumbnail_url}
            alt="video thumbnail"
            className="homeVideo"
          />
          <div className="homeVideoProfCont">
            <img
              src={channel.profile_image_url}
              alt="channel logo"
              className="videoProf"
            />
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

export default HomeVideoItems
