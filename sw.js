//console.log("registrado");

const CACHE_ELEMENTS = [ // ACA VAN LAS RUTAS A CACHEAR
    "./", 
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./style.css",
    "./components/Contador.js"
]

const CACHE_NAME = "v3_cache_contador_react"

self.addEventListener("install", (e) => {
   // console.log(e)
   e.waitUntil(
       caches.open(CACHE_NAME).then(cache => {
            cache.addAll(CACHE_ELEMENTS).then( () => {
                self.skipWaiting()
            }).catch(console.log);
       })
   )
});

// Activar SW
self.addEventListener("activate", (e) => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys().then((cacheNames) => {
            //console.log(cacheNames);
            return Promise.all(cacheNames.map(cacheName => { // compara uno por uno los links
              return  (
                 cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName) //-1 este chache no existe, no es la misma version de cache
              );

            }))
        }).then(() => self.clients.claim()) // agrega el engranaje en el NetWork al Inspeccionar
    );
 });

// FETCH
 self.addEventListener("fetch", (e) => {
    // console.log(e.request);
    e.respondWith(
        caches.match(e.request).then( (res) => {    // quiero ver que coincide en mi cache
            if(res) {
                return res;
            }
            return fetch(e.request);
        })    
    );
 });