const API_URL = process.env.REACT_APP_API_URL

const fetchData = (url) => fetch(url).then((response) => response.json())
export const getUsers = () => fetchData(`${API_URL}/users`)
export const getUser = (id) => fetchData(`${API_URL}/user/${id}`)
export const getConversations = (id) => fetchData(`${API_URL}/conversation/user/${id}`)
export const getConversationDetails = (id) => fetchData(`${API_URL}/conversation/${id}`)
export const getLimitedConversations = (id, limit = 50, offset = 0) => fetchData(`${API_URL}/conversation/${id}/message/limited?limit=${limit}&offset=${offset}`)
export const postMessage = (id, body) => fetch(`${API_URL}/conversation/${id}/message/send`, {
  method: 'POST',
  body: body,

}).then((res) => res.json())
export const getNewMessages = (conversationId, lastMessageId) => fetchData(`${API_URL}/conversation/${conversationId}/new/${lastMessageId}`)
