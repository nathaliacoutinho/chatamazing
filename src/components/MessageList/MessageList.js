import React from 'react'

const MessageList = ({ messages, currentUser }) => {
  return (
    <ul className="Messages-list">
      {messages.map((message) => (
        <li
          className={(message.senderId === currentUser.id) ? 'Messages-message currentMember' : 'Messages-message'}
          key={message.id}
        >
                <span>
                  <img src={message.senderAvatar} alt="avatar" className="avatar"/>
                </span>
          <div className="Message-content">
            <div className="username">
              {message.username}
            </div>
            <div className="text">{message.message}</div>
            <div className="time">{message.timestamp}</div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default MessageList