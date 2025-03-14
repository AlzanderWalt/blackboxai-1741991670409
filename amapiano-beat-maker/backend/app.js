const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('./utils/logger');
const beatRoutes = require('./routes/beatRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the generated directory
app.use('/generated', express.static(path.join(__dirname, 'generated')));

// Routes
app.use('/api/beats', beatRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error'
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// Start server
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

module.exports = app;
