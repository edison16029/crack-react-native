import { Audio } from 'expo-av'
import { Vibration } from 'react-native'

const soundObjects = {}

class SoundAndVibrate {
  static async loadSoundsAsync(library) {
      const promisedSoundObjects = []
  
      for (const name in library) {
        const sound = library[name]
  
        soundObjects[name] = new Audio.Sound()
  
        promisedSoundObjects.push(
          await soundObjects[name].loadAsync(sound)
        )
      }
  
      return promisedSoundObjects
    }

  static async play(name, playSound, vibrate) {
      try {
        if (soundObjects[name] && playSound) 
          await soundObjects[name].replayAsync()
        if(vibrate)
          Vibration.vibrate()
      } catch (error) {
        console.warn(error)
      }
    }
}

export default SoundAndVibrate