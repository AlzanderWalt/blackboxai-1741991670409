// Typical Amapiano patterns and probabilities
const patterns = {
  kick: {
    basic: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    syncopated: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    weight: 0.8
  },
  snare: {
    basic: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    offbeat: [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    weight: 0.7
  },
  logDrum: {
    basic: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    rolling: [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
    weight: 1.0 // Log drum is essential in Amapiano
  },
  hihat: {
    basic: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    groove: [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    weight: 0.9
  },
  shaker: {
    basic: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    syncopated: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    weight: 0.6
  }
};

// Amapiano-specific variations
const variations = {
  tempoRange: {
    min: 110,
    max: 118,
    typical: 115
  },
  swingFactor: {
    min: 0.2,
    max: 0.4
  }
};

// Helper function to generate random pattern based on instrument patterns
function generatePattern(instrument) {
  const pattern = patterns[instrument];
  if (!pattern) return Array(16).fill(0);

  // Randomly choose between basic and variation patterns
  const basePattern = Math.random() > 0.5 ? pattern.basic : pattern[Object.keys(pattern)[1]];
  
  // Apply random variations while maintaining the core rhythm
  return basePattern.map(step => {
    if (step === 1 && Math.random() > pattern.weight) {
      return 0;
    }
    if (step === 0 && Math.random() < 0.1 * pattern.weight) {
      return 1;
    }
    return step;
  });
}

// Generate complete beat pattern
function generateBeatPattern() {
  const instruments = Object.keys(patterns);
  const beatPattern = {};

  instruments.forEach(instrument => {
    beatPattern[instrument] = generatePattern(instrument);
  });

  return {
    patterns: beatPattern,
    tempo: Math.floor(
      variations.tempoRange.min + 
      Math.random() * (variations.tempoRange.max - variations.tempoRange.min)
    ),
    swing: variations.swingFactor.min + 
           Math.random() * (variations.swingFactor.max - variations.swingFactor.min)
  };
}

module.exports = {
  generateBeatPattern,
  patterns,
  variations
};
