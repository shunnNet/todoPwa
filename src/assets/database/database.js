import { randomId } from '@/assets/js/helper.js'
import { add, getAll, del, keys, put } from './idb.js'

export const addTodoItem = (value) => {
  value.id = randomId()
  value.isComplete = false
  return add(JSON.parse(JSON.stringify(value)))
}

export const modifyCompleteState = (item) => {
  return put(JSON.parse(JSON.stringify(item)))
}

export const getAllTodoItem = async () => {
  return getAll()
}
export const deleteTodoItem = async (item) => {
  return del(item.id)
}

export const getAllKeys = async () => {
  return keys()
}
