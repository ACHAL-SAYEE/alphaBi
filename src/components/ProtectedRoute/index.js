import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {auth} from '../../firebase'

class ProtectedRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      loading: true,
    }
  }

  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState({user: authUser, loading: false})
      } else {
        this.setState({user: null, loading: false})
      }
    })
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  render() {
    const {component: RenderedComponent, ...rest} = this.props // Renamed to RenderedComponent

    const {user, loading} = this.state

    if (loading) {
      // You may want to show a loading spinner or something else here
      return null
    }

    return (
      <Route
        {...rest}
        render={props =>
          user ? <RenderedComponent {...props} /> : <Redirect to="/login" />
        }
      />
    )
  }
}

export default ProtectedRoute
