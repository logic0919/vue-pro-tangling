import request from '@/utils/request'
const getAll = () => {
  return request.get('/royal/all')
}
const getById = (id) => {
  return request.get('/royal/id', { params: { id } })
}
const search = (name) => {
  return request.get('/royal/search', { params: { name } })
}
export { getAll, getById, search }
