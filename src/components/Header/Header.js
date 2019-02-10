import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import chatIcon from './chat-icon.png'
import './Header.css'
import Container from 'react-bootstrap/es/Container'

const Header = ({ history, currentUser, onLogout }) => (
  <div className="Navbar-fixed">
    <Container>
      <div className="Navigation-content">
        <Link to="/">
          <img src={chatIcon} alt="icon" className="round-icon"/>
        </Link>

        <div className="Navigation-actions">

          <Link className="Navigation-link" to="/">Conversations</Link>
          {currentUser && (
            <Link className="Navigation-Link" to="/" title="Logout" onClick={() => onLogout()}>Logout!</Link>
          )}
        </div>
      </div>
    </Container>
  </div>
)

// HOC (Higher Order Component): withRouter
export default withRouter(Header)