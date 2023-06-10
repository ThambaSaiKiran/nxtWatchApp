import React from 'react'

const watchAppContext = React.createContext({
  activeSideButton: '',
  changeActiveButton: () => {},
  isDark: false,
  changeBgColor: () => {},
  savedVideos: [],
  addSavedVideos: () => {},
  removeSavedVideos: () => {},
})

export default watchAppContext
