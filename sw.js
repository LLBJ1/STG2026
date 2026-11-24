// Cache only public static icons; never cache API, credentials, HTML or student data.
const CACHE='gradebook-public-v371';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./icon-192.png','./icon-512.png','./manifest.webmanifest'])));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('gradebook-public-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||!['icon-192.png','icon-512.png','manifest.webmanifest'].includes(u.pathname.split('/').pop()))return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request))) });
