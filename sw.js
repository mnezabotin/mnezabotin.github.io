const CACHE = 'network-or-cache-v1.0.0'

// При установке воркера мы должны закешировать часть данных (статику).
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll([
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

        '/manifest.json',
        '/Slackey.ttf',
        '/styles.css',
        // '/sw.js',
        '/Tijuf.otf',
      ])
    )
  )
})

// при событии fetch, мы используем кэш, и только потом обновляем его данным с сервера
self.addEventListener('fetch', function(event) {
  // Мы используем `respondWith()`, чтобы мгновенно ответить без ожидания ответа с сервера.
  event.respondWith(fromCache(event.request))
  // `waitUntil()` нужен, чтобы предотвратить прекращение работы worker'a до того как кэш обновиться.
  event.waitUntil(update(event.request))
})

function fromCache(request) {
  return caches.open(CACHE).then((cache) =>
    cache.match(request).then((matching) =>
      matching || Promise.reject('no-match')
    ))
}

function update(request) {
  return caches.open(CACHE).then((cache) =>
    fetch(request).then((response) =>
      cache.put(request, response)
    )
  )
}
