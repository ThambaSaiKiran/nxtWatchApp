import './index.css'
import {Link} from 'react-router-dom'
import watchAppContext from '../../Context/isDarkLightContext'

const GamingItems = props => {
  const {item} = props
  const {id, title} = item
  return (
    <watchAppContext.Consumer>
      {value => {
        const {isDark} = value
        const bgClass = isDark ? 'dark' : 'white'
        return (
          <li className="gameItem">
            <Link to={`videos/${id}`} className="link">
              <div className="gameItemCont">
                <img
                  src={item.thumbnail_url}
                  alt="video thumbnail"
                  className="gamingVideo"
                />
                <div className="gameProfCont">
                  <div className={bgClass}>
                    <p className="gameTitle">{title}</p>
                    <p>{item.view_count} Watching Worldwide</p>
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

export default GamingItems
