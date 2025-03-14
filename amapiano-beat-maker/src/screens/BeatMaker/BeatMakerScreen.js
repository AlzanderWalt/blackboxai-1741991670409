import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import beatGeneratorService from '../../services/beatGenerator';

export default function BeatMakerScreen() {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(null);

  const drumPads = [
    { id: 1, label: 'Kick', icon: 'drum' },
    { id: 2, label: 'Snare', icon: 'drum' },
    { id: 3, label: 'Hi-Hat', icon: 'drum' },
    { id: 4, label: 'Clap', icon: 'hand-paper' },
    { id: 5, label: 'Log Drum', icon: 'drum' },
    { id: 6, label: 'Shaker', icon: 'egg' },
    { id: 7, label: 'Bass', icon: 'wave-square' },
    { id: 8, label: 'FX', icon: 'magic' },
  ];

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBeat, setGeneratedBeat] = useState(null);

  const handleGenerateBeat = async () => {
    try {
      setIsGenerating(true);
      const beat = await beatGeneratorService.generateBeat({
        duration: 30 // Default duration
      });
      setGeneratedBeat(beat);
      setBpm(beat.tempo);
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating beat:', error);
      setIsGenerating(false);
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      beatGeneratorService.stopCurrentBeat();
    } else {
      if (generatedBeat) {
        beatGeneratorService.playCurrentBeat();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const DrumPad = ({ label, icon }) => (
    <TouchableOpacity style={styles.drumPad}>
      <FontAwesome5 name={icon} size={24} color="#fff" />
      <Text style={styles.drumPadLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.controlSection}>
        <View style={styles.bpmControl}>
          <Text style={styles.bpmLabel}>BPM: {Math.round(bpm)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={60}
            maximumValue={180}
            value={bpm}
            onValueChange={setBpm}
            minimumTrackTintColor="#8c52ff"
            maximumTrackTintColor="#333"
            thumbTintColor="#8c52ff"
          />
        </View>

        <View style={styles.transportControls}>
          <TouchableOpacity 
            style={styles.transportButton} 
            onPress={togglePlayback}
            disabled={!generatedBeat && !isPlaying}
          >
            <FontAwesome5 
              name={isPlaying ? 'stop' : 'play'} 
              size={24} 
              color={(!generatedBeat && !isPlaying) ? '#666' : '#fff'} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.transportButton}
            disabled={!generatedBeat}
          >
            <FontAwesome5 
              name="save" 
              size={24} 
              color={!generatedBeat ? '#666' : '#fff'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.aiSection}>
        <TouchableOpacity 
          style={[
            styles.generateButton,
            isGenerating && styles.generateButtonDisabled
          ]}
          onPress={handleGenerateBeat}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <FontAwesome5 name="spinner" size={24} color="#fff" />
              <Text style={styles.generateButtonText}>Generating Beat...</Text>
            </>
          ) : (
            <>
              <FontAwesome5 name="robot" size={24} color="#fff" />
              <Text style={styles.generateButtonText}>Generate Amapiano Beat</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.drumPadGrid}>
        {drumPads.map((pad) => (
          <DrumPad key={pad.id} label={pad.label} icon={pad.icon} />
        ))}
      </View>

      <View style={styles.sequencerSection}>
        <Text style={styles.sectionTitle}>Pattern Sequencer</Text>
        {/* Sequencer grid will be implemented here */}
        <View style={styles.sequencerPlaceholder}>
          <Text style={styles.placeholderText}>Pattern Sequencer Coming Soon</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ... existing styles ...
  generateButtonDisabled: {
    backgroundColor: '#666',
    opacity: 0.7,
  },
  transportButtonDisabled: {
    backgroundColor: '#333',
    opacity: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  controlSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  bpmControl: {
    marginBottom: 20,
  },
  bpmLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  transportControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  transportButton: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  generateButton: {
    backgroundColor: '#8c52ff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  drumPadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
    justifyContent: 'space-between',
  },
  drumPad: {
    backgroundColor: '#1e1e1e',
    width: '48%',
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  drumPadLabel: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
  },
  sequencerSection: {
    padding: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sequencerPlaceholder: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
});
