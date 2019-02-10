import React from 'react'
import { getConversationDetails, getLimitedConversations, getNewMessages } from '../../services/api'
import { Container } from 'react-bootstrap'
import './ConversationDetails.css'
import MessageForm from '../MessageForm/MessageForm'
import MessageList from '../MessageList/MessageList'

class ConversationDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      participantUsers: [],
    }

    this.formatMessage = this.formatMessage.bind(this)
    this.getUserName = this.getUserName.bind(this)
    this.setMessages = this.setMessages.bind(this)
  }

  getUserName(id) {
    const { users } = this.props
    const foundObject = users.find((user) => id && (user.id === id))
    return foundObject ? foundObject.name : ''
  }

  async componentDidMount() {
    const { users, currentUser } = this.props
    if (users.length && currentUser) {
      // Wait until all messages are into dom...
      await this.setMessages()

      // now we can scroll down!
      const messageFormSelector = window.document.querySelector('.message-form')
      if (messageFormSelector) {
        messageFormSelector.scrollIntoView()
      }

      // And let's check for new messages
      this.checkMessageInterval = setInterval(() => this.checkNewMessages(), 2000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.checkMessageInterval)
  }

  async setMessages() {
    const { id } = this.props.match.params
    const response = await Promise.all([getLimitedConversations(id), getConversationDetails(id)])
    const limitedConversations = response[0]
    const conversationDetails = response[1]
    this.setState({
      chatName: conversationDetails.conversation.name,
      participantUsers: conversationDetails.users.map((participant) => ({
        participantName: this.getUserName(participant.id),
      })),
      messages: limitedConversations
        .reverse()
        .filter((conversation) => conversation.senderId)
        .map((conversation) => this.formatMessage(conversation)),
    })
  }

  formatMessage(message) {
    return {
      id: message.id,
      message: message.message,
      timestamp: message.timestamp,
      username: this.getUserName(message.senderId),
      senderId: message.senderId,
      senderAvatar: `http://i.pravatar.cc/300?img=${message.senderId}`,
    }
  }

  checkNewMessages = async () => {
    const { id: conversationId } = this.props.match.params
    if (!this.state.messages.length) {
      return false
    }
    const lastMessageId = this.state.messages[this.state.messages.length - 1].id
    const newMessages = await getNewMessages(conversationId, lastMessageId)


    if (Array.isArray(newMessages)) {
      const newestMessages = newMessages.map((message) => this.formatMessage(message))

      this.setState({
        messages: [...this.state.messages, ...newestMessages],
      })
    } else {
      console.log('No new messages')
    }
  }

  render() {
    const { messages, chatName } = this.state
    const currentUser = this.props.currentUser
    const { id: conversationId } = this.props.match.params

    return (
      <div className="Messages-wrapper">
        <Container>
          <div>
            <h2 className="Text-center">{chatName}</h2>

            {messages.length ?
              <MessageList messages={messages} currentUser={currentUser}/> :
              <strong> There are no messages </strong>
            }

            <MessageForm
              currentUser={currentUser}
              conversationId={conversationId}
            />
          </div>
        </Container>
      </div>
    )
  }

}


export default ConversationDetails

