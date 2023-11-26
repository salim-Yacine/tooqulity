const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        const token = req.body.token;
        console.log(token)
        if (token) {
            // token = token.slice(7);
            verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.json({
                        code: 1,
                        message: "Invalid token",
                        data: null
                    });

                } else {
                    next()
                }
            });
        } else {
            res.json({
                code: 1,
                message: "user not exist",
                data: null
            });
        }
    }
};