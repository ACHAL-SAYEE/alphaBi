import {Component} from 'react'
import './index.css'
import {auth} from '../../firebase'

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
  }

  async componentDidMount() {
    // Check if the user is already logged in
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is logged in, redirect to Home route
        const {history} = this.props
        history.push('/')
      }
    })
  }

  loginUser = async e => {
    e.preventDefault()
    const {password, email} = this.state
    try {
      this.setState({error: ''})
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password,
      )
      const {user} = userCredential
      if (user && !user.emailVerified) {
        this.setState({
          error:
            'Email not verified. Please check your email for verification instructions.',
        })
        auth.signOut()
        return
      }
      const {history} = this.props
      history.push('/')
    } catch (error) {
      this.setState({error: error.message})
    }
  }

  onChangeEmail = e => {
    this.setState({email: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  render() {
    const {email, password, error} = this.state
    return (
      <div className="bg-login">
        <div className="loginForm-login">
          <form className="form-login" onSubmit={this.loginUser}>
            <label htmlFor="email">Email</label>
            <input id="email" value={email} onChange={this.onChangeEmail} />
            <label htmlFor="password">password</label>
            <input
              id="password"
              value={password}
              onChange={this.onChangePassword}
            />
            <button type="submit">Login</button>
          </form>
          <p>{error}</p>
          <p>
            Not registered yet? Click <a href="/register">here</a> to register
          </p>
        </div>
      </div>
    )
  }
}

export default Login
