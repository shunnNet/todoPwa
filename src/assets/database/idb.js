import { openDB, deleteDB, wrap, unwrap } from 'idb'

const version = 2
const NAME = 'TodoList'

export const database = openDB(NAME, version, {
  upgrade(database, oldVersion, newVersion, transaction) {
    database.createObjectStore(NAME, {
      keyPath: 'id',
    })
  },
})

export async function add(data) {
  // insert only method
  const db = await database
  await db.add(NAME, data)
}
export async function put(data) {
  // insert only method
  const db = await database
  await db.put(NAME, data)
}

export async function del(key) {
  return (await database).delete(NAME, key)
}

export async function get(key) {
  // insert only method
  const db = await database
  return db.get(NAME, key)
}
export async function getAll(key) {
  // insert only method
  const db = await database
  return db.getAll(NAME)
}

export async function getAllFromIndex(key, value) {
  const db = await database
  return await db.getAllFromIndex(NAME, key, value)
}

export default database

export async function keys() {
  return (await database).getAllKeys(NAME)
}
