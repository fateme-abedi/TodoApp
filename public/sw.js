

//   const CACHE_VERSION = 10;
// const CURRENT_CACHE = `main-${CACHE_VERSION}`;

// // these are the routes we are going to cache for offline support
// const cacheFiles = ['/static/js/main.chunk.js',
// '/static/js/0.chunk.js',
// '/static/js/bundle.js',
// '/index.html',
// '/',
// 'https://todosapp-bc036-default-rtdb.firebaseio.com/todos.json'];

// // on activation we clean up the previously registered service workers
// self.addEventListener('activate', evt =>
//   evt.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           if (cacheName !== CURRENT_CACHE) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   )
// );

// // on install we download the routes we want to cache for offline
// self.addEventListener('install', evt =>
//   evt.waitUntil(
//     caches.open(CURRENT_CACHE).then(cache => {
//       return cache.addAll(cacheFiles);
//     })
//   )
// );

// // fetch the resource from the network
// const fromNetwork = (request, timeout) =>
//   new Promise((fulfill, reject) => {
//     const timeoutId = setTimeout(reject, timeout);
//     fetch(request).then(response => {
//       clearTimeout(timeoutId);
//       fulfill(response);
//       update(request);
//     }, reject);
//   });

// // fetch the resource from the browser cache
// const fromCache = request =>
//   caches
//     .open(CURRENT_CACHE)
//     .then(cache =>
//       cache
//         .match(request)
//         .then(matching => matching || cache.match('/offline/'))
//     );

// // cache the current page to make it available for offline
// const update = request =>
//   caches
//     .open(CURRENT_CACHE)
//     .then(cache =>
//       fetch(request).then(response => cache.put(request, response))
//     );

// // general strategy when making a request (eg if online try to fetch it
// // from the network with a timeout, if something fails serve from cache)
// self.addEventListener('fetch', evt => {
//   evt.respondWith(
//     fromNetwork(evt.request, 10000).catch(() => fromCache(evt.request))
//   );
//   evt.waitUntil(update(evt.request));
// });


var CACHE_STATIC_NAME = 'static-v10';
var CACHE_DYNAMIC_NAME = 'dynamic-v2';

self.addEventListener('install', function (event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function (cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll([
          '/static/js/main.chunk.js',
'/static/js/0.chunk.js',
'/static/js/bundle.js',
'/index.html',
'/',
'https://todosapp-bc036-default-rtdb.firebaseio.com/todos.json'
        ]);
      })
  )
});

self.addEventListener('activate', function (event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
      .then(function(res) {
        return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
      })
      .catch(function(err) {
        return caches.match(event.request);
      })
  );
});

// Cache-only
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.match(event.request)
//   );
// });

// Network-only
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     fetch(event.request)
//   );
// });