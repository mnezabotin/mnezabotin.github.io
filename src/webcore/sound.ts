type Sound = (url: string) => Promise<void>

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

  const playSound = async (url: string) => {
    const source = context.createBufferSource()
    if (!buffer[url]) {
      buffer[url] = await fetch(url)
        .then(res => res.arrayBuffer())
        .then(arrayBuffer => context?.decodeAudioData(arrayBuffer) || null)
    }
    source.buffer = buffer[url]
    source.connect(context.destination)
    source.start()

  }

  return playSound
}
