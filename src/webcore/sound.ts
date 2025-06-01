export const useSound = () => {
  let context: AudioContext | null = new AudioContext()
  let buffer: Record<string, AudioBuffer | null> = {}
  return async (url: string) => {
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
}
