import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/" component={Home} />
      </Switch>
    )
  }
}

export default App
