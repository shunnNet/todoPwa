importScripts("/precache-manifest.20170073bd0b390b3394afcf94729172.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.precaching.precacheAndRoute([
  {
    revision: '17ecfaee522eaf5b3ad9c9aa1b2973cc',
    url: '/manifest.json',
  },
])

self.__precacheManifest = [].concat(self.__precacheManifest || [])
// workbox.precaching.suppressWarnings();
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  'https://jsonplaceholder.typicode.com/todos/1',
  ({ url, event, params }) => {
    return fetch(event.request)
      .then((response) => {
        let clonedResponse = response.clone()
        clonedResponse.json().then((body) => {
          self.idb.openDb('VueApp', 1).then((db) => {
            db.transaction('todos', 'readwrite').objectStore('todos').put(body)
          })
        })
        return response
      })
      .catch((err) => {
        return self.idb.openDb('VueApp', 1).then((db) => {
          return db
            .transaction('todos')
            .objectStore('todos')
            .getAll()
            .then(
              (values) =>
                new Response(JSON.stringify(values), {
                  status: 200,
                  statusText: 'MyCustomResponse!',
                })
            )
        })
      })
  }
)

