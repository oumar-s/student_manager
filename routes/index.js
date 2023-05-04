const express = require('express');
const router = express.Router();

// Load each route
const studentRoutes = require('./student');
const courseRoutes = require('./course');
const professorRoutes = require('./professor');

// Define routes using other route files
router.use('/students', studentRoutes);
router.use('/courses', courseRoutes);
router.use('/professors', professorRoutes);

module.exports = router;