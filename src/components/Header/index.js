import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {FaMoon} from 'react-icons/fa'
import watchAppContext from '../../Context/isDarkLightContext'

import {
  NavContainer,
  WatchLogoImage,
  ThemeIconContainer,
  MediumDevicesProfile,
  WhiteColorSun,
  HiMenuAdjust,
  NavItems,
} from './styledComponents'

const Header = props => (
  <watchAppContext.Consumer>
    {value => {
      const {isDark, changeBgColor} = value
      const onClickChangeTheme = () => {
        changeBgColor()
      }

      const onLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/')
      }

      return (
        <NavContainer isDark={isDark}>
          <Link to="/">
            <WatchLogoImage
              src={
                isDark
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              }
              alt="website logo"
            />
          </Link>
          <NavItems>
            <ThemeIconContainer
              isDark={isDark}
              type="button"
              onClick={onClickChangeTheme}
              data-testid="theme"
            >
              {isDark ? <WhiteColorSun size={18} /> : <FaMoon size={18} />}
            </ThemeIconContainer>
            <HiMenuAdjust isDark={isDark} size={18} />
            <MediumDevicesProfile
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <Popup
              modal
              trigger={
                <button type="button" className="trigger-button logout">
                  Logout
                </button>
              }
            >
              {close => (
                <>
                  <div className="logoutCont1">
                    <p>Are you sure,you want to logout?</p>
                    <div className="logoutCont">
                      <button
                        type="button"
                        className="trigger-button"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={onLogout}
                        className="confirmBtn"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Popup>
          </NavItems>
        </NavContainer>
      )
    }}
  </watchAppContext.Consumer>
)

export default withRouter(Header)
