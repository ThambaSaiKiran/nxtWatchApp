import {Link} from 'react-router-dom'
import {SideBarButton, SidebarContainer, SpanAdjust} from './styledComponent'
import watchAppContext from '../../Context/isDarkLightContext'
import './index.css'

const DisplayButtons = props => {
  const {eachButton} = props
  const {id, icon, route} = eachButton
  // route

  return (
    <watchAppContext.Consumer>
      {value => {
        const {isDark, changeActiveButton, sideButtonActiveId} = value
        const bgClass = isDark ? 'dark' : 'white'
        const onChangeActiveButton = () => {
          changeActiveButton(id)
        }
        return (
          <SidebarContainer>
            <Link to={route} className="link-item">
              <SideBarButton
                type="button"
                isActive={id === sideButtonActiveId}
                onClick={onChangeActiveButton}
                isDark={isDark}
              >
                {icon}
                <SpanAdjust>{id}</SpanAdjust>
              </SideBarButton>
            </Link>
          </SidebarContainer>
        )
      }}
    </watchAppContext.Consumer>
  )
}

export default DisplayButtons
