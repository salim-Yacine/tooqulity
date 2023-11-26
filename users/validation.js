const { body } = require('express-validator');
const { myValidator } = require('../utils');

exports.create = [

    body('name').trim().notEmpty(),
    body('email').trim().notEmpty().isEmail(),
    body('password').isLength({ min: 5 }),
    myValidator,
];

exports.update = this.create;


exports.resetepass = [
    body("pass1", "Password should be numeric and min 5 characters ").isLength({ min: 5 }),
    body("pass2",).isLength({ min: 5 }),
    myValidator,
]