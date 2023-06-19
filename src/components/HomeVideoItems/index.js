import './index.css'
import {Link} from 'react-router-dom'
import watchAppContext from '../../Context/isDarkLightContext'

const HomeVideoItems = props => {
  const {item} = props
  const {id, title, channel} = item
  return (
    <watchAppContext.Consumer>
      {value => {
        const {isDark} = value
        const bgClass = isDark ? 'dark' : 'white'
        return (
          <li className={`homeItem ${bgClass}`}>
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
                  <div className={`homeVideoProfDetCont1 ${bgClass}`}>
                    <p className="title1">{title}</p>
                    <p>{channel.name}</p>
                    <div className="viewsCont chName" id="homeVideoProfDetCont">
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

export default HomeVideoItems
