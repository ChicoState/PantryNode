/**
 * Backend API v1
 * Employee Endpoints
 */
var express = require('express');
var router = express.Router();
var { initModels, person } = require( "../../../models/init-models");
const bcrypt = require('bcryptjs');

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
    console.log("Body: ", req.body);
    const { firstName, lastName, phone, email, password } = req.body;
    person.findOrCreate({
        where: {
            email: email
        },
        defaults: {
            fname: firstName,
            lname: lastName,
            password: password,
            phone: phone
        }
    }).then(([user, created]) => {
        if (!created) {
            return res.json({status: false, message: "User already exists."})
        }
        else {
            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(password, salt, async (err, hash) => {
                    user.set({
                        password: hash,
                    });
                    await user.save();
                }))

            console.log(user);
            return res.json({status: true, message: "User with email " + email + " created."})
        }
    });
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
