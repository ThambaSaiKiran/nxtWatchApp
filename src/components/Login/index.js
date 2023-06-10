import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import watchAppContext from '../../Context/isDarkLightContext'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
    errMsg: '',
    passCheck: false,
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = error => {
    this.setState({isError: true, errMsg: error})
  }

  onSubmitFrom = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const logUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(logUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    }
    if (response.status === 400) {
      this.onLoginFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  changePassView = () => {
    this.setState(prevState => ({passCheck: !prevState.passCheck}))
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, isError, errMsg, passCheck} = this.state
    const passView = passCheck ? 'text' : 'password'
    return (
      <watchAppContext.Consumer>
        {value => {
          const {isDark} = value
          const bgClass = isDark ? 'dark' : 'white'
          return (
            <div className={`loginCont ${isDark}`}>
              <div className="loginCont1">
                <div className="logoCont">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                    className="logo"
                  />
                </div>
                <div>
                  <form onSubmit={this.onSubmitFrom} className="loginForm">
                    <label htmlFor="name">USERNAME</label>
                    <input
                      id="name"
                      type="text"
                      value={username}
                      placeholder="Username"
                      className="input input1"
                      onChange={this.onChangeUsername}
                    />
                    <label htmlFor="passW">PASSWORD</label>
                    <input
                      id="passW"
                      type={passView}
                      value={password}
                      placeholder="Password"
                      className="input input1"
                      onChange={this.onChangePassword}
                    />
                    <div>
                      <input
                        id="check"
                        type="checkbox"
                        checked={passCheck}
                        onClick={this.changePassView}
                      />
                      <label htmlFor="check" className="passCheck">
                        Show Password
                      </label>
                    </div>
                    <button type="submit" className="logBtn">
                      Login
                    </button>
                  </form>
                  {isError && <p className="errMsg">*{errMsg}</p>}
                </div>
              </div>
            </div>
          )
        }}
      </watchAppContext.Consumer>
    )
  }
}

export default Login
