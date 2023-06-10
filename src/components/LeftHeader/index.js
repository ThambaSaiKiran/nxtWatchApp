import {AiFillHome} from 'react-icons/ai'
import {Component} from 'react'
import {RiHomeLine, RiGameLine, RiSaveLine} from 'react-icons/ri'
import DisplayButtons from '../DisplayButtons'
import watchAppContext from '../../Context/isDarkLightContext'
import {
  SidebarContainer,
  BottomAddress,
  ContactHeading,
  IconsContainer,
  ImageSocialMedia,
  AboutPara,
} from './styledComponents'
import './index.css'

const buttons = [
  {
    id: 'Home',
    icon: <RiHomeLine size={18} />,
    route: '/',
  },
  {
    id: 'Trending',
    icon: <AiFillHome size={18} />,
    route: '/trending',
  },

  {
    id: 'Gaming',
    icon: <RiGameLine size={18} />,
    route: '/gaming',
  },
  {
    id: 'Saved Videos',
    icon: <RiSaveLine size={18} />,
    route: '/saved-videos',
  },
]

class LeftHeader extends Component {
  render() {
    return (
      <watchAppContext.Consumer>
        {value => {
          const {isDark, sideButtonActiveId} = value
          return (
            <SidebarContainer isDark={isDark}>
              <ul className="ul-container">
                {buttons.map(eachButton => (
                  <DisplayButtons
                    eachButton={eachButton}
                    key={eachButton.id}
                    isActive={eachButton.id === sideButtonActiveId}
                    changeActiveButton={this.changeActiveButton}
                  />
                ))}
              </ul>
              <BottomAddress isDark={isDark}>
                <ContactHeading isDark={isDark}>CONTACT US</ContactHeading>
                <IconsContainer>
                  <ImageSocialMedia
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                  />
                  <ImageSocialMedia
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                  />
                  <ImageSocialMedia
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                  />
                </IconsContainer>
                <AboutPara>
                  Enjoy! Now to see your channels and recommendations!
                </AboutPara>
              </BottomAddress>
            </SidebarContainer>
          )
        }}
      </watchAppContext.Consumer>
    )
  }
}

export default LeftHeader
