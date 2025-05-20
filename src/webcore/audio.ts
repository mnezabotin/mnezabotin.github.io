type useAudioType = (name: string) => void

export const useAudio = (soundPaths: string[]): useAudioType => {
  const audios: Record<string, { audio: HTMLAudioElement, path: string }> = {}

  const getAudioName = (path: string) => {
    const pathSplitted = path.split('/')
    const source = pathSplitted[pathSplitted.length - 1]
    const sourceSplitted = source.split('.')
    
    return sourceSplitted[0]
  }

  const init = () => {
    for (const path of soundPaths) {
      const audio = new Audio(path)
      audio.volume = 0.25
      audio.addEventListener(
        'ended',
        function () {
          this.currentTime = 0
        }
      )
      
      const name = getAudioName(path)
      audios[name] = { audio, path }
    }
  }

  init()

  return (name: string) => {
    const audio = audios[name]?.audio
    const path = audios[name]?.path

    if (!audio || !path) {
      return
    }

    if (audio.currentTime === 0) {
      audio.play()
    } else {
      var s = new Audio(path)
      s.volume = 0.25
      s.play()
    }
  }
}
