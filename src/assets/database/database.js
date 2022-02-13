import { add, getAll } from './idb.js'

export const addTodoItem = async (value) => {
  return add(JSON.parse(JSON.stringify(value)))
}

export const getAllTodoItem = async () => {
  return getAll()
}
