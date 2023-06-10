import Header from '../Header'
import LeftHeader from '../LeftHeader'
import watchAppContext from '../../Context/isDarkLightContext'
import SavedandTrendingVideoItems from '../SavedandTrendingVideoItems'
import './index.css'

const SavedVideos = () => (
  <div>
    <Header />
    <div className="midMain">
      <LeftHeader />
      <watchAppContext.Consumer>
        {value => {
          const {isDark, savedVideos} = value
          const bgClass = isDark ? 'dark' : 'white'
          return (
            <div className={bgClass}>
              {savedVideos.length === 0 ? (
                <div className="noSaved">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                    className="noSavedVideos"
                  />
                  <h1>No saved videos found</h1>
                  <p>You can save your videos while watching them.</p>
                </div>
              ) : (
                <div>
                  <div>
                    <h1>Saved Videos</h1>
                    <ul>
                      {savedVideos.map(eachItem => (
                        <SavedandTrendingVideoItems
                          item={eachItem}
                          key={eachItem.id}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )
        }}
      </watchAppContext.Consumer>
    </div>
  </div>
)

export default SavedVideos
