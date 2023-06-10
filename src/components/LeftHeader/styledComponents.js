import Styled from 'styled-components'

export const SidebarContainer = Styled.div`
  background-color: ${props => (props.isDark ? '#212121' : '#ffffff')};
  color: ${props => (props.isDark ? '#ffffff' : 'black')};
  font-family: 'Roboto';
  display: flex;
  flex-direction: column;
  justify-content: space-between;
//   border: solid 2px green;
  height: 100vh;
  width: 100%;
  max-width: 250px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const BottomAddress = Styled.div`
  padding: 10px;
`

export const ContactHeading = Styled.p`
  font-family: 'Roboto';
  font-size: 18px;
 
`

export const IconsContainer = Styled.div`
  display: flex;
`

export const ImageSocialMedia = Styled.img`
  height: 25px;
  margin-right: 10px;
  font-family: 'Roboto';
`

export const AboutPara = Styled.p`
  font-family: 'Roboto';
  font-weight: 600;
`
