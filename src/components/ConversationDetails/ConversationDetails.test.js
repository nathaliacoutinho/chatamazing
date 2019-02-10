import ConversationDetails from './ConversationDetails'

describe('ConversationDetails', () => {
  describe('formatMessage', () => {
    it('should return the message object including an avatar url and name', () => {
      const component = new ConversationDetails()
      component.getUserName = jest.fn().mockReturnValue('a username')
      const message = {
        id: 1,
        message: 'Hello!',
        timestamp: 'i am actually a string hee hee',
        senderId: 2,
      }
      const result = component.formatMessage(message)
      expect(result).toEqual({
        id: 1,
        message: 'Hello!',
        timestamp: 'i am actually a string hee hee',
        username: 'a username',
        senderId: 2,
        senderAvatar: 'http://i.pravatar.cc/300?img=2',
      })
    })
  })

  describe('getUsername', () => {
    it('should get the username of given id', () => {
      const props = {
        users: [{
          id: 1,
          name: 'Britney',
        },
          {
            id: 2,
            name: 'Beyonce',
          }],
      }
      const component = new ConversationDetails(props)
      const id = 1
      const result = component.getUserName(id)
      expect(result).toEqual('Britney')

    })
  })
})