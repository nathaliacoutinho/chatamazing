import ConversationList from './ConversationList'

describe('ConversationList', () => {
  describe('sanitizeConversations', () => {
    it('should change the name of the conversation, if only 2 users are in it (personal conversation)', () => {
      const props = {
        currentUser: { id: 2 },
        users: [{ id: 1, name: 'huey' }, { id: 2, name: 'dewey' }, { id: 3, name: 'louie' }],
      }
      const component = new ConversationList(props)
      const conversations = [{
        conversation: {
          name: null,
        },
        users: [{
          userid: 1,
        }, {
          userid: 2,
        }],
      }]
      const result = component.sanitizeConversations(conversations)

      expect(result).toEqual([{ name: 'huey' }])
    })
  })

  describe('randomColor', () => {
    it('should give a random hex color', () => {
      // We need to mock Math.random()
      const mockMath = Object.create(global.Math)
      mockMath.random = () => 0.5
      global.Math = mockMath

      const component = new ConversationList()
      const result = component.randomColor()
      expect(result).toBe('#7fffff')
    })
  })
})