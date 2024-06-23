import request from '@/utils/request'
const getComment = (level, secondParam) => {
  return request.get('/comment/getComments', {
    params: { level, secondParam }
  })
}
const addComment = (level, royal, content, user, parent, at) => {
  return request.post('/comment/addComment', {
    level,
    royal,
    content,
    user,
    parent,
    at
  })
}

const like = (id, user_id) => {
  return request.post('/comment/like', { id, user_id })
}
const cancellike = (id, user_id) => {
  return request.post('/comment/cancellike', { id, user_id })
}
export { getComment, addComment, like, cancellike }
