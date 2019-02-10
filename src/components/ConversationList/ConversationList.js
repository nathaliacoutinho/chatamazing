import React from 'react'
import { getConversations, getUser } from '../../services/api'
import { Link } from 'react-router-dom'
import './ConversationList.css'
import { Container } from 'react-bootstrap'

class ConversationList extends React.Component {
  constructor(props) {
    super(props)

    this.sanitizeConversations = this.sanitizeConversations.bind(this)

    this.state = {
      conversations: [],
      userName: null,
    }
  }

  // random function to choose different avatar colors for our conversations list
  randomColor = () => {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16)
  }


  async componentDidMount() {
    const { users, currentUser: { id } } = this.props
    if (id && users.length) {
      const [userInfo, conversations] = await Promise.all([getUser(id), getConversations(id)])

      this.setState(() => ({
        conversations: this.sanitizeConversations(conversations),
        userName: userInfo.name,
      }))
    }
  }

  /**
   * If the conversation has 2 users, we know it's a personal conversation,
   * so let's re-name the name key to the user name
   * @param conversations
   * @returns {*}
   */
  sanitizeConversations(conversations) {
    return conversations.map(({ conversation, users }) => {
      let otherUsers
      if (users.length === 2) {
        otherUsers = users.filter((user) => user.userid !== this.props.currentUser.id)
        return {
          ...conversation,
          name: this.props.users.find((user) => user.id === otherUsers[0].userid).name,
        }
      }
      return conversation
    })
  }


  render() {
    const { userName, conversations } = this.state

    return (
      <div className="list-wrapper">
        <Container>
          <div className="ConversationList">
            {userName && <h1 className="Text-center">Welcome, {userName}</h1>}

            <ul className="Messages-list">
              {conversations.map((conversation) => (
                <li key={conversation.id} className="Message-card">

                  <Link to={`/conversation/${conversation.id}`} className="Message-link">

                    <div key={conversation.id} className="Message-name">
                      <div
                        className="avatar"
                        style={{ backgroundColor: this.randomColor() }}
                      />
                      <p>{conversation.name}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    )
  }
}

export default (ConversationList)