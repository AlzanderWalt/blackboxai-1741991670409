const path = require('path');
const { v4: uuidv4 } = require('uuid');
const ffmpeg = require('fluent-ffmpeg');
const logger = require('../utils/logger');
const { generateBeatPattern, variations } = require('../utils/beatPatterns');

// Store generated beats in memory (replace with database in production)
const generatedBeats = [];

const generateBeat = async (req, res) => {
    try {
        const { duration = 30 } = req.body;
        
        // Validate input
        if (duration < 10 || duration > 300) {
            return res.status(400).json({ 
                error: 'Duration must be between 10 and 300 seconds' 
            });
        }

        // Generate AI beat pattern
        const beatPattern = generateBeatPattern();
        
        // Generate unique filename
        const beatId = uuidv4();
        const filename = `${beatId}.mp3`;
        const outputPath = path.join(__dirname, '../generated', filename);

        // Create audio file using the generated pattern
        await generateAudioFile(beatPattern, outputPath, duration);

        // Store beat metadata
        const beat = {
            id: beatId,
            filename,
            tempo: beatPattern.tempo,
            duration,
            pattern: beatPattern.patterns,
            swing: beatPattern.swing,
            createdAt: new Date().toISOString(),
            downloadUrl: `/api/beats/download/${beatId}`
        };
        
        generatedBeats.push(beat);
        
        logger.info(`Generated beat: ${beatId}`);
        
        res.status(201).json(beat);
    } catch (error) {
        logger.error('Error generating beat:', error);
        res.status(500).json({ 
            error: 'Failed to generate beat' 
        });
    }
};

// Helper function to generate audio file from pattern
async function generateAudioFile(beatPattern, outputPath, duration) {
    // TODO: Implement actual audio generation using ffmpeg
    // For now, creating a placeholder audio file
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input('anullsrc')
            .inputFormat('lavfi')
            .duration(duration)
            .output(outputPath)
            .audioFrequency(44100)
            .audioChannels(2)
            .audioBitrate('192k')
            .on('end', resolve)
            .on('error', reject)
            .run();
    });
}

const listBeats = (req, res) => {
    try {
        res.json(generatedBeats);
    } catch (error) {
        logger.error('Error listing beats:', error);
        res.status(500).json({ 
            error: 'Failed to list beats' 
        });
    }
};

const downloadBeat = (req, res) => {
    try {
        const { beatId } = req.params;
        const beat = generatedBeats.find(b => b.id === beatId);
        
        if (!beat) {
            return res.status(404).json({ 
                error: 'Beat not found' 
            });
        }
        
        const filePath = path.join(__dirname, '../generated', beat.filename);
        res.download(filePath);
    } catch (error) {
        logger.error('Error downloading beat:', error);
        res.status(500).json({ 
            error: 'Failed to download beat' 
        });
    }
};

module.exports = {
    generateBeat,
    listBeats,
    downloadBeat
};
