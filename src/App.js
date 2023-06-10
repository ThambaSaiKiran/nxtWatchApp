import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import SavedVideos from './components/SavedVideos'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import notFound from './components/notFound'
import watchAppContext from './Context/isDarkLightContext'

/*  import Home from './components/Home'
import SavedVideos from './components/SavedVideos'
import Trending from './components/Trending'
import VideoItemDetails from './components/VideoItemDetails'
import Gaming from './components/Gaming'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
<ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
    <ProtectedRoute exact path="/trending" component={Trending} />
    <ProtectedRoute exact path="/videos/:id" component={VideoItemDetails} />
    <ProtectedRoute exact path="/gaming" component={Gaming} />
    <Route component={NotFound} />
*/

import './App.css'

// Replace your code here
class App extends Component {
  state = {sideButtonActiveId: '', isDark: false, savedVideos: []}

  changeBgColor = () => {
    this.setState(prevState => ({
      isDark: !prevState.isDark,
    }))
  }

  changeActiveButton = id => {
    this.setState({
      sideButtonActiveId: id,
    })
  }

  addSavedVideos = item => {
    const {savedVideos} = this.state
    const newList = [...savedVideos]
    newList.push(item)
    this.setState({savedVideos: newList})
  }

  removeSavedVideos = id => {
    const {savedVideos} = this.state
    const newList = savedVideos.filter(eachItem => eachItem.id !== id)
    this.setState({savedVideos: newList})
  }

  render() {
    const {isDark, savedVideos, sideButtonActiveId} = this.state
    console.log(savedVideos)
    return (
      <watchAppContext.Provider
        value={{
          isDark,
          changeBgColor: this.changeBgColor,
          savedVideos,
          addSavedVideos: this.addSavedVideos,
          removeSavedVideos: this.removeSavedVideos,
          changeActiveButton: this.changeActiveButton,
          sideButtonActiveId,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route component={notFound} />
        </Switch>
      </watchAppContext.Provider>
    )
  }
}

export default App
