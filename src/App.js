import React, { Component } from 'react'
import UserList from './components/UserList/UserList'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ConversationList from './components/ConversationList/ConversationList'
import { getUsers } from './services/api'
import ConversationDetails from './components/ConversationDetails/ConversationDetails'
import Header from './components/Header/Header'
import './App.css'

const SESSION_TOKEN_KEY = 'sessiontoken'

class App extends Component {
  constructor(props) {
    super(props)

    const token = window.sessionStorage.getItem(SESSION_TOKEN_KEY)

    this.state = {
      users: [],
      currentUser: (token) ? JSON.parse(window.sessionStorage.getItem(SESSION_TOKEN_KEY)) : null,
    }

    this.setUsers = this.setUsers.bind(this)
    this.setSessionToken = this.setSessionToken.bind(this)
    this.removeSessionToken = this.removeSessionToken.bind(this)
  }

  componentDidMount() {
    this.setUsers()
  }

  async setUsers() {
    const users = await getUsers()
    this.setState(() => ({
      users,
    }))
  }

  setSessionToken(user) {
    this.setState({
      currentUser: user,
    })

    window.sessionStorage.setItem(SESSION_TOKEN_KEY, JSON.stringify(user))
  }

  removeSessionToken() {
    this.setState({
      currentUser: null,
    })

    window.sessionStorage.removeItem(SESSION_TOKEN_KEY)
  }

  render() {
    const { users, currentUser } = this.state
    return (
      <div className="App">
        <Router>
          <div>
            <Header
              onLogout={this.removeSessionToken}
              currentUser={currentUser}
            />
            
            <Route exact path="/" component={() => currentUser ?

              <ConversationList currentUser={currentUser} users={users}/> :
              <UserList users={users} onClickUser={this.setSessionToken}/>
            }/>

            <Route
              path="/conversation/:id"
              component={(props) => (
                <ConversationDetails
                  users={users}
                  currentUser={currentUser}
                  {...props}
                />
              )}
            />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
