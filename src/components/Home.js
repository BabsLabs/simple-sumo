import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Home = (props) => {

  const handleClick = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})

    .then(response => {
      props.handleLogout()
      props.history.push('/')
    })
    .catch(error => console.log(error))
  }

  return (
    <div>
      <p>Welcome to...</p>
      <h1>Simple Sumo</h1>
      <div>
        {
          !props.loggedInStatus ? <Link to='/login'>Log In</Link> : null
        }
      </div>
      <div>
        {
          !props.loggedInStatus ? <Link to='/signup'>Sign Up</Link> : null
        }
      </div>
      <div>
        {
          !props.loggedInStatus ? <Link to='/'>Play as Guest</Link> : null
        }
      </div>
      <div>
        { 
          props.loggedInStatus ? <Link to='/logout' onClick={handleClick}>Log Out</Link> : null
        }
      </div>
    </div>
  )
}

export default Home