import { openDB, deleteDB, wrap, unwrap } from 'idb'

const version = 1
const NAME = 'todoList'

export const database = openDB(NAME, version, {
  upgrade(database, oldVersion, newVersion, transaction) {
    const objectStore = database.createObjectStore(NAME, {
      autoIncrement: true,
    })

    objectStore.createIndex('done', 'done', { unique: false })
    objectStore.createIndex('title', 'title', { unique: false })
    objectStore.createIndex('seal', 'seal', { unique: false })
    objectStore.createIndex('date', 'date', { unique: false })
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
