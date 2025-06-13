type Sound = (url: string) => void

export const useSound = (paths?: string[]): Sound => {
  const context: AudioContext | null = new AudioContext()
  const buffer: Record<string, AudioBuffer | null> = {}

  const setBuffer = (url: string) => {
    fetch(url)
      .then(res => res.arrayBuffer())
      .then(arrayBuffer => context?.decodeAudioData(arrayBuffer) || null)
      .then(b => {
        if (b) {
          buffer[url] = b
        }
      })
  }

  if (paths && paths.length) {
    for (const p of paths) {
      setBuffer(p)
    }
  }

  let isSoundOn = true

  const playSound = (url: string, rate?: number) => {
    if (!isSoundOn) {
      return
    }

    setTimeout(async () => {
      const source = context.createBufferSource()
      if (!buffer[url]) {
        buffer[url] = await fetch(url)
          .then(res => res.arrayBuffer())
          .then(arrayBuffer => context?.decodeAudioData(arrayBuffer) || null)
      }
      source.buffer = buffer[url]
      source.connect(context.destination)
      if (rate) {
        source.playbackRate.value = rate
      }
      source.start()
    }, 0)
  }
  
  window.onfocus = () => { isSoundOn = true }
  window.onblur =  () => { isSoundOn = false }

  return playSound
}
