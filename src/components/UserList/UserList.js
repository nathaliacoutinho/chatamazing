import React, { Component } from 'react'
import { Button, Container } from 'react-bootstrap'
import './UserList.css'

class UserList extends Component {
  render() {
    const { onClickUser, users } = this.props
    return (
      <div className="list-wrapper">
        <Container>
          <div className="User-list">
            {users.map(user => (
              <div key={user.id} className="User-list-item">
                <Button
                  block title={`Login as ${user.name}`}
                  onClick={() => onClickUser(user)}
                >
                  {user.id}. {user.name}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </div>
    )

  }
}

export default UserList