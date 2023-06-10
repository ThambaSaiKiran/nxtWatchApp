import Styled from 'styled-components'

export const SidebarContainer = Styled.li`
display:flex;
width:100%;
`
export const SideBarButton = Styled.button`
  font-family: 'Roboto';
  display: flex;
  align-items: center;
  width:100%;
  padding: 10px;
  border: 0;
  background-color: ${props => (props.isActive ? '#cccccc' : 'transparent')};
  color: ${props => (props.isDark ? '#ffffff' : 'black')};
`

export const SpanAdjust = Styled.span`
padding-left:10px;
border:0;

`
