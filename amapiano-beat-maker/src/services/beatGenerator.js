import axios from 'axios';
import AudioService from './audioService';

const API_URL = 'http://localhost:3000/api/beats';

class BeatGeneratorService {
    constructor() {
        this.currentBeat = null;
    }

    async generateBeat(params = {}) {
        try {
            const response = await axios.post(`${API_URL}/generate`, {
                duration: params.duration || 30,
                // Additional parameters can be added here
            });

            this.currentBeat = response.data;

            // Load the generated patterns into the audio service
            if (this.currentBeat.pattern) {
                await this.loadBeatIntoAudioService(this.currentBeat);
            }

            return this.currentBeat;
        } catch (error) {
            console.error('Error generating beat:', error);
            throw error;
        }
    }

    async loadBeatIntoAudioService(beat) {
        try {
            // Set the tempo
            AudioService.setTempo(beat.tempo);

            // Load default samples if not already loaded
            await AudioService.loadDefaultSamples();

            // Create a playable beat pattern
            const playableBeat = {
                patterns: beat.pattern,
                tempo: beat.tempo,
                swing: beat.swing
            };

            // Store the beat for playback
            this.currentBeat = playableBeat;

            return playableBeat;
        } catch (error) {
            console.error('Error loading beat into audio service:', error);
            throw error;
        }
    }

    async listBeats() {
        try {
            const response = await axios.get(`${API_URL}/list`);
            return response.data;
        } catch (error) {
            console.error('Error fetching beats:', error);
            throw error;
        }
    }

    async downloadBeat(beatId) {
        try {
            const response = await axios.get(`${API_URL}/download/${beatId}`, {
                responseType: 'blob'
            });
            return response.data;
        } catch (error) {
            console.error('Error downloading beat:', error);
            throw error;
        }
    }

    getDownloadUrl(beatId) {
        return `${API_URL}/download/${beatId}`;
    }

    // Play the current beat using the AudioService
    playCurrentBeat() {
        if (this.currentBeat) {
            AudioService.playBeat(this.currentBeat);
        } else {
            console.warn('No beat loaded to play');
        }
    }

    // Stop the current beat
    stopCurrentBeat() {
        AudioService.stopBeat();
    }

    // Get the current beat's metadata
    getCurrentBeat() {
        return this.currentBeat;
    }
}

export default new BeatGeneratorService();
