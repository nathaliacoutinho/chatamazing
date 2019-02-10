import React from 'react'
import { postMessage } from '../../services/api'
import './MessageForm.css'

class MessageForm extends React.Component {
  constructor(...options) {
    super(...options)

    this.state = {
      inputMessage: '',
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  async onSubmit(e) {
    e.preventDefault()
    const { currentUser, conversationId } = this.props
    const body = JSON.stringify({ message: this.state.inputMessage, senderId: currentUser.id })

    this.setState({
      inputMessage: '',
    })

    await postMessage(conversationId, body)
  }

  onChange(e) {
    this.setState({ inputMessage: e.target.value })
  }

  render() {
    const { inputMessage } = this.state
    return (
      <form onSubmit={this.onSubmit} className="message-form">
        <input
          value={inputMessage}
          type="text"
          placeholder="Type..."
          name="message"
          onChange={this.onChange}
        />
        <button>send</button>
      </form>
    )
  }
}

export default MessageForm