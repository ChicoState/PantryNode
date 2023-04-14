/**
 * Backend API v1
 * Employee Endpoints
 */
var express = require('express');
var router = express.Router();

/**
 * GET: /api/v1/employee
 * Gets all employees
 */
router.get('/', function(req, res) {
    res.json({ method: 'GET' });
});

/**
 * GET: /api/v1/employee/:id
 * Gets employee with ID
 */
router.get('/:id(\\d+)', function(req, res) {
    res.json({ method: 'GET', id: req.params.id });
});

/**
 * POST: /api/v1/employee
 * Creates a new employee
 */
router.post('/', function(req, res) {
    res.json({ method: 'POST' });
});

/**
 * PATCH: /api/v1/employee
 * Modifies employee with ID
 */
router.patch('/:id(\\d+)', function(req, res) {
    res.json({ method: 'PATCH', id: req.params.id });
});

/**
 * DELETE: /api/v1/employee
 * Deletes employee with ID
 */
router.delete('/:id(\\d+)', function(req, res) {
    res.json({ method: 'DELETE', id: req.params.id });
});

module.exports = router;
