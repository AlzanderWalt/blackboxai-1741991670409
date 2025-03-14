const express = require('express');
const router = express.Router();
const { generateBeat, listBeats, downloadBeat } = require('../controllers/beatController');

// Generate a new beat
router.post('/generate', generateBeat);

// List all generated beats
router.get('/list', listBeats);

// Download a specific beat
router.get('/download/:beatId', downloadBeat);

module.exports = router;
