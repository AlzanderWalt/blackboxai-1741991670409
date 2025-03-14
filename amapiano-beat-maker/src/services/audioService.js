import { Audio } from 'expo-av';

class AudioService {
    constructor() {
        this.sound = null;
        this.isPlaying = false;
    }

    async loadAudio(uri) {
        try {
            if (this.sound) {
                await this.sound.unloadAsync();
            }

            const { sound } = await Audio.Sound.createAsync(
                { uri },
                { shouldPlay: false }
            );
            
            this.sound = sound;
            return true;
        } catch (error) {
            console.error('Error loading audio:', error);
            return false;
        }
    }

    async playAudio() {
        try {
            if (!this.sound) {
                return false;
            }

            if (this.isPlaying) {
                await this.pauseAudio();
                return true;
            }

            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
                shouldDuckAndroid: true,
            });

            await this.sound.playAsync();
            this.isPlaying = true;
            return true;
        } catch (error) {
            console.error('Error playing audio:', error);
            return false;
        }
    }

    async pauseAudio() {
        try {
            if (!this.sound) {
                return false;
            }

            await this.sound.pauseAsync();
            this.isPlaying = false;
            return true;
        } catch (error) {
            console.error('Error pausing audio:', error);
            return false;
        }
    }

    async stopAudio() {
        try {
            if (!this.sound) {
                return false;
            }

            await this.sound.stopAsync();
            this.isPlaying = false;
            return true;
        } catch (error) {
            console.error('Error stopping audio:', error);
  }

  /**
   * Play a complete beat pattern
   * @param {Object} beat - Beat pattern to play
   */
  playBeat(beat) {
    if (this.isPlaying) {
      this.stopBeat();
    }

    this.currentBeat = beat;
    this.isPlaying = true;

    // Calculate interval based on tempo
    const interval = (60 / this.tempo) * 1000 / 4; // 16th notes

    let step = 0;
    this.intervalId = setInterval(() => {
      // Play sounds for each instrument at current step
      Object.entries(beat.patterns).forEach(([instrument, pattern]) => {
        if (pattern[step] === 1) {
          this.playSound(instrument).catch(console.error);
        }
      });

      step = (step + 1) % 16;
    }, interval);
  }

  /**
   * Stop the currently playing beat
   */
  stopBeat() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isPlaying = false;

    // Stop all playing sounds
    this.sounds.forEach(sound => sound.stop());
  }

  /**
   * Record audio input
   * @param {number} duration - Recording duration in seconds
   * @returns {Promise} - Resolves with the recorded audio data
   */
  recordAudio(duration) {
    // TODO: Implement audio recording functionality
    return Promise.reject(new Error('Recording not implemented yet'));
  }

  /**
   * Clean up resources
   */
  cleanup() {
    this.stopBeat();
    this.sounds.forEach(sound => {
      sound.release();
    });
    this.sounds.clear();
  }

  /**
   * Get the current playback state
   * @returns {Object} - Current state of the audio service
   */
  getState() {
    return {
      isPlaying: this.isPlaying,
      tempo: this.tempo,
      currentBeat: this.currentBeat,
    };
  }

  /**
   * Load default drum samples
   * @returns {Promise} - Resolves when all samples are loaded
   */
  async loadDefaultSamples() {
    const samples = {
      kick: 'kick.wav',
      snare: 'snare.wav',
      hihat: 'hihat.wav',
      logDrum: 'log_drum.wav',
      shaker: 'shaker.wav',
    };

    try {
      await Promise.all(
        Object.entries(samples).map(([key, path]) => 
          this.loadSound(key, path)
        )
      );
      console.log('All samples loaded successfully');
    } catch (error) {
      console.error('Failed to load samples:', error);
      throw error;
    }
  }

  /**
   * Apply effects to the audio output
   * @param {Object} effects - Effect parameters to apply
   */
  applyEffects(effects) {
    // TODO: Implement audio effects (reverb, delay, etc.)
    console.warn('Audio effects not implemented yet');
  }
}

// Export a singleton instance
export default new AudioService();
