const CACHE = 'yolapopit-v1.0.0'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      cache.addAll([
        '/media/icons/favicon.ico',
        '/media/icons/favicon.png',
        '/media/icons/favicon.svg',

        '/media/levels/sloth.png',
        '/media/levels/rabbit.png',
        '/media/levels/bear.png',
        '/media/levels/horse.png',
        '/media/levels/fish.png',
        '/media/levels/lion.png',
        '/media/levels/elephant.png',
        '/media/levels/tiger.png',
        '/media/levels/crocodile.png',
        '/media/levels/beaver.png',
        '/media/levels/giraffe.png',
        '/media/levels/penguin.png',
        '/media/levels/wolf.png',
        '/media/levels/chiken.png',
        '/media/levels/pig.png',
        '/media/levels/shimp.png',
        '/media/levels/corgi.png',
        '/media/levels/cow.png',
        '/media/levels/deer.png',
        '/media/levels/donkey.png',
        '/media/levels/panda.png',
        '/media/levels/dinosaur.png',
        '/media/levels/rat.png',
        '/media/levels/turtle.png',
        '/media/levels/cockroach.png',
        '/media/levels/parrot.png',
        '/media/levels/kangaroo.png',
        '/media/levels/spider.png',
        '/media/levels/squirrel.png',
        '/media/levels/stork.png',
        '/media/levels/whale.png',

        '/media/back.svg',
        '/media/cursor.svg',
        '/media/sloth.svg',
        '/media/star.svg',

        '/sounds/pop/pop1.mp3',
        '/sounds/pop/pop2.mp3',
        '/sounds/pop/pop3.mp3',
        '/sounds/pop/pop4.mp3',
        '/sounds/pop/pop5.mp3',
        '/sounds/pop/pop6.mp3',
        '/sounds/pop/pop7.mp3',
        '/sounds/pop/pop8.mp3',
        '/sounds/pop/pop9.mp3',
        '/sounds/pop/pop10.mp3',
        '/sounds/pop/pop11.mp3',
        '/sounds/pop/pop12.mp3',
        '/sounds/pop/pop13.mp3',
        '/sounds/pop/pop14.mp3',
        '/sounds/pop/pop15.mp3',
        '/sounds/pop/pop16.mp3',
        '/sounds/pop/pop17.mp3',
        '/sounds/pop/pop18.mp3',
        '/sounds/pop/pop19.mp3',
        '/sounds/pop/pop20.mp3',
        '/sounds/pop/pop21.mp3',
        '/sounds/pop/pop22.mp3',
        '/sounds/pop/pop23.mp3',
        '/sounds/pop/pop24.mp3',
        '/sounds/fail.mp3',
        '/sounds/wrong.mp3',
        '/sounds/win.mp3',
        '/sounds/complete.mp3',

        '/fonts/PressStart2P.ttf',
        '/fonts/Tijuf.otf',

        '/index.html',
        '/manifest.json',
        '/styles.css',
        '/sw.js',
      ])
    )
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(fromCache(event.request))
  event.waitUntil(update(event.request))
})

function fromCache(request) {
  return caches.open(CACHE).then((cache) =>
    cache.match(request).then((matching) => {
      if (matching) {
        return matching
      } else {
        console.log(request.url)
        return fetch(request)
      }
    })
  )
}

function update(request) {
  return caches.open(CACHE).then((cache) =>
    fetch(request).then((response) =>
      cache.put(request, response)
    )
  )
}
