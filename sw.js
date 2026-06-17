const C='karbyfit-v10';
const ASSETS=['./','./index.html','./dumbbells.html','./manifest.json','./manifest-db.json','./icon-180.png','./icon-192.png','./icon-512.png','./gallery.html','./gallery-data.js','./dino/01.mp4','./dino/02.mp4','./dino/03.mp4','./dino/04.mp4','./dino/05.mp4','./dino/06.mp4','./dino/07.mp4','./dino/08.mp4','./dino/09.mp4','./dino/10.mp4','./dino/01.jpg','./dino/02.jpg','./dino/03.jpg','./dino/04.jpg','./dino/05.jpg','./dino/06.jpg','./dino/07.jpg','./dino/08.jpg','./dino/09.jpg','./dino/10.jpg','./gifs/0276.gif','./gifs/0283.gif','./gifs/0489.gif','./gifs/0662.gif','./gifs/1373.gif','./gifs/3013.gif','./gifs/3544.gif','./gifs/3699.gif','./gifs/bird-dog.gif','./gifs/cat-cow.gif','./gifs/chest-opener.gif','./gifs/childs-pose.gif','./gifs/cross-arm.gif','./gifs/crunch.gif','./gifs/db-bent-row.gif','./gifs/db-bicep-curl.gif','./gifs/db-calf-raise.gif','./gifs/db-floor-press.gif','./gifs/db-goblet-squat.gif','./gifs/db-lateral-raise.gif','./gifs/db-rdl.gif','./gifs/db-reverse-lunge.gif','./gifs/db-shoulder-press.gif','./gifs/db-sumo-squat.gif','./gifs/db-tricep-ext.gif','./gifs/flutter.gif','./gifs/hamstring.gif','./gifs/hip-flexor.gif','./gifs/lunge.gif','./gifs/pike.gif','./gifs/plank.gif','./gifs/reverse-lunge.gif','./gifs/russian-twist.gif','./gifs/spinal-twist.gif','./gifs/squat.gif','./gifs/wall-sit.gif'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()).catch(()=>{}));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
// Network-first: always try fresh, fall back to cache only when offline
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request).then(resp=>{
      const cp=resp.clone();
      caches.open(C).then(c=>c.put(e.request,cp));
      return resp;
    }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html')))
  );
});
