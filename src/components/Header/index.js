import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {FaMoon} from 'react-icons/fa'
import watchAppContext from '../../Context/isDarkLightContext'
import './index.css'

import {
  NavContainer,
  WatchLogoImage,
  ThemeIconContainer,
  MediumDevicesProfile,
  WhiteColorSun,
  HiMenuAdjust,
  NavItems,
} from './styledComponents'

class Header extends Component {
  state = {sideDisplay: false}

  toggleDisplay = () => {
    this.setState(prevState => ({sideDisplay: !prevState.sideDisplay}))
  }

  render() {
    const {sideDisplay} = this.state
    const displayClass = sideDisplay ? 'display' : 'notDisplay'
    return (
      <watchAppContext.Consumer>
        {value => {
          const {isDark, changeBgColor} = value
          const bgClass = isDark ? 'dark' : 'white'
          const onClickChangeTheme = () => {
            changeBgColor()
          }

          const onLogout = () => {
            Cookies.remove('jwt_token')
            const {history} = this.props
            history.replace('/')
          }

          return (
            <div>
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
                    {isDark ? (
                      <WhiteColorSun size={18} />
                    ) : (
                      <FaMoon size={18} />
                    )}
                  </ThemeIconContainer>
                  <HiMenuAdjust
                    isDark={isDark}
                    size={18}
                    onClick={this.toggleDisplay}
                  />
                  <MediumDevicesProfile
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />
                  <Popup
                    modal
                    trigger={
                      <button
                        type="button"
                        className="trigger-button logoutBtn"
                      >
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
              <nav className={`${displayClass} ${bgClass}`}>
                <ul className="mobileSideHead">
                  <li className="headItem">
                    <Link to="/">
                      <p>Home</p>
                    </Link>
                  </li>
                  <li className="headItem">
                    <Link to="/trending">
                      <p>Trending</p>
                    </Link>
                  </li>
                  <li className="headItem">
                    <Link to="/gaming">
                      <p>Gaming</p>
                    </Link>
                  </li>
                  <li className="headItem">
                    <Link to="/saved-videos">
                      <p>Saved Videos</p>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          )
        }}
      </watchAppContext.Consumer>
    )
  }
}

export default withRouter(Header)
