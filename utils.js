const pool = require("./config/database");
const { validationResult } = require('express-validator');


async function getQueryResults(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            try {
                if (error) reject(error);
                resolve(results);
            } catch (error) {
                reject(error);
            }
        });
    });
}
function errorHandler(err, req, res, next) {
    return res.status(500).json({
        code: 1,
        message: err.message,
        data: null,
    });
}
const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
        return {
            field: error.param,
            message: error.msg,
            location: error.location,
        };
    },
});
function myValidator(req, res, next) {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({
            code: 1,
            message: errors.array(),
            data: null,
        });

    } else {
        return next();
    }
}
function roundNumber(num, digits) {
    return Number(num).toFixed(digits);
}

module.exports = {
    getQueryResults,
    errorHandler,
    myValidator,
    roundNumber
}