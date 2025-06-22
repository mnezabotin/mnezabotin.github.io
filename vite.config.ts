import { defineConfig } from 'vite'
import path from 'path'
// import { VitePWA } from 'vite-plugin-pwa'

// const faviconURL = './public/media/icons/favicon.svg'
// const assets = [
//   './public/media/icons/favicon.ico',
//   './public/media/icons/favicon.png',
//   // './public/media/icons/favicon.svg',

//   './public/media/levels/sloth.png',
//   './public/media/levels/rabbit.png',
//   './public/media/levels/bear.png',
//   './public/media/levels/horse.png',
//   './public/media/levels/fish.png',
//   './public/media/levels/lion.png',
//   './public/media/levels/elephant.png',
//   './public/media/levels/tiger.png',
//   './public/media/levels/crocodile.png',
//   './public/media/levels/beaver.png',
//   './public/media/levels/giraffe.png',
//   './public/media/levels/penguin.png',
//   './public/media/levels/wolf.png',
//   './public/media/levels/chiken.png',
//   './public/media/levels/pig.png',
//   './public/media/levels/shimp.png',
//   './public/media/levels/corgi.png',
//   './public/media/levels/cow.png',
//   './public/media/levels/deer.png',
//   './public/media/levels/donkey.png',
//   './public/media/levels/panda.png',
//   './public/media/levels/dinosaur.png',
//   './public/media/levels/rat.png',
//   './public/media/levels/turtle.png',
//   './public/media/levels/cockroach.png',
//   './public/media/levels/parrot.png',
//   './public/media/levels/kangaroo.png',
//   './public/media/levels/spider.png',
//   './public/media/levels/squirrel.png',
//   './public/media/levels/stork.png',
//   './public/media/levels/whale.png',
//   './public/media/levels/cat-c.png',

//   './public/media/back.svg',
//   './public/media/cursor.svg',
//   './public/media/sloth.svg',
//   './public/media/star.svg',

//   './public/sounds/pop/pop1.mp3',
//   './public/sounds/pop/pop2.mp3',
//   './public/sounds/pop/pop3.mp3',
//   './public/sounds/pop/pop4.mp3',
//   './public/sounds/pop/pop5.mp3',
//   './public/sounds/pop/pop6.mp3',
//   './public/sounds/pop/pop7.mp3',
//   './public/sounds/pop/pop8.mp3',
//   './public/sounds/pop/pop9.mp3',
//   './public/sounds/pop/pop10.mp3',
//   './public/sounds/pop/pop11.mp3',
//   './public/sounds/pop/pop12.mp3',
//   './public/sounds/pop/pop13.mp3',
//   './public/sounds/pop/pop14.mp3',
//   './public/sounds/pop/pop15.mp3',
//   './public/sounds/pop/pop16.mp3',
//   './public/sounds/pop/pop17.mp3',
//   './public/sounds/pop/pop18.mp3',
//   './public/sounds/pop/pop19.mp3',
//   './public/sounds/pop/pop20.mp3',
//   './public/sounds/pop/pop21.mp3',
//   './public/sounds/pop/pop22.mp3',
//   './public/sounds/pop/pop23.mp3',
//   './public/sounds/pop/pop24.mp3',
//   './public/sounds/fail.mp3',
//   './public/sounds/wrong.mp3',
//   './public/sounds/win.mp3',
//   './public/sounds/complete.mp3',

//   './public/fonts/PressStart2P.ttf',
//   './public/fonts/Tijuf.otf',
// ]

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
  // plugins: [
  //   VitePWA({
  //     // injectRegister: 'auto',
  //     // includeAssets: [faviconURL, ...assets],
  //     manifest: {
  //       short_name: 'Pop it',
  //       name: 'Yo last Pop it',
  //       description: 'Pop it arcade',
  //       display: 'fullscreen',
  //       background_color: '#040404',
  //       start_url: '/',
  //       icons: [{
  //         src: faviconURL,
  //         sizes: 'any',
  //         type: 'image/svg+xml',
  //       }]
  //     },
  //   })
  // ]
})
