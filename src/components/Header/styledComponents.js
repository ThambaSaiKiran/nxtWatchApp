import Styled from 'styled-components'
import {BiSun} from 'react-icons/bi'
import {GiHamburgerMenu} from 'react-icons/gi'

export const NavContainer = Styled.nav`
padding:20px;
background-color:${props => (props.isDark ? '#212121' : '#ffffff')};
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;

`

export const WatchLogoImage = Styled.img`
height:22px;
`

export const NavItems = Styled.div`
display:flex;
flex-direction:row;
justify-content:center;
align-items:center;
`

export const ThemeIconContainer = Styled.button`
background-color : ${props => (props.isDark ? '#212121' : '#ffffff')};
border:0px;
margin-right:20px;
`
export const MediumDevicesProfile = Styled.img`
font-family:'Roboto';
height:21px;
margin-right: 20px;
@media screen and (max-width:768px){
    display:none;
}
`
export const WhiteColorSun = Styled(BiSun)`
  color: #ffffff;
  font-size:20px;
`

export const HiMenuAdjust = Styled(GiHamburgerMenu)`
       color : ${props => (props.isDark ? '#ffffff' : '#000000')};
       margin-right: 10px;
       @media screen and (min-width:768px){
       display:none;
    }`
