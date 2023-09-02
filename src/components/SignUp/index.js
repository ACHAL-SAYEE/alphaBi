import {Component} from 'react'
import './index.css'
import {auth} from '../../firebase'

// import {AuthProvider} from '../../contexts/AuthContext'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    ConfirmPassword: '',
    registered: false,
    username: '',
  }

  registerUser = async e => {
    e.preventDefault()
    const {password, ConfirmPassword, email, username} = this.state
    console.log(password, ConfirmPassword)
    if (password !== ConfirmPassword) {
      this.setState({error: 'Passwords do not match'})
    } else {
      try {
        this.setState({error: ''})
        const userCredential = await auth.createUserWithEmailAndPassword(
          email,
          password,
        )

        const {user} = userCredential
        await user.sendEmailVerification()
        await user.updateProfile({
          displayName: username,
        })
        this.setState({registered: true})
      } catch (error) {
        console.log(error)
        this.setState({error: 'Failed to create an account'})
      }
    }
  }

  onChangeEmail = e => {
    this.setState({email: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onChangeConfirmPassword = e => {
    this.setState({ConfirmPassword: e.target.value})
  }

  onChangeUsername = e => {
    this.setState({username: e.target.value})
  }

  render() {
    const {
      email,
      password,
      error,
      ConfirmPassword,
      registered,
      username,
    } = this.state
    return (
      <div className="bg-register">
        <div className="loginForm-register">
          <form className="form-register" onSubmit={this.registerUser}>
            <label htmlFor="email">Email</label>
            <input id="email" value={email} onChange={this.onChangeEmail} />
            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password">password</label>
            <input
              id="password"
              value={password}
              onChange={this.onChangePassword}
            />
            <label htmlFor="Confirmpassword">Confirm password</label>
            <input
              id="Confirmpassword"
              value={ConfirmPassword}
              onChange={this.onChangeConfirmPassword}
            />
            <button type="submit">SignUp</button>
          </form>
          <p>{error}</p>
          {registered && (
            <>
              <p>
                Account created successfully.We sent a mail to your account.In
                order to use your account you must verify your account
              </p>
              <p>
                Click <a href="/login">here</a> to login
              </p>
            </>
          )}
          {!registered && (
            <p>
              Already registered Click <a href="/login">here</a> to login
            </p>
          )}
        </div>
      </div>
    )
  }
}
export default SignUp
