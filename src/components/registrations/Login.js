import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: ''
    }
  }

  componentDidMount() {
    return this.props.loggedInStatus ? this.redirect() : null
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const {username, password} = this.state

    let user = {
      username: username,
      password: password
    }

    axios.post('http://babslabs-simple-sumo-backend.herokuapp.com/login', {user}, {withCredentials: true})

    .then(response => {
      if (response.data.logged_in) {
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors: error'))
  }

  redirect = () => {
    this.props.history.push('/')
  }

  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map(error => {
            return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

  handleVerification = () => {
    let verificationStatus = this.props.location.search;

    if (verificationStatus === "?verified=successful") {
      return (
          <p>Thank you for verifing your account. Please Log In to continue.</p>
        )
      } else if (verificationStatus === "?verified=already_verified") {
        return (
          <p>This account has already been verified. Please Log In to continue.</p>
      )
    }
  }

  render() {
    const {username, password} = this.state

    
    
    return (
      <div>

        <div>
          {this.handleVerification()}
        </div>

        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            placeholder="username" 
            name="username" 
            value={username}
            onChange={this.handleChange}
          />
          <input 
            type="text" 
            placeholder="password" 
            name="password" 
            value={password}
            onChange={this.handleChange}
          />

          <button placeholder="submit" type="submit">Log In</button>

          <div>
            or <Link to='/signup'>Sign Up</Link>
          </div>
        </form>

        <div>
          { this.state.errors ? this.handleErrors() : null }
        </div>

      </div>
    )
  }
}

export default Login