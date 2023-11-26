const { createComment, getComments } = require("./service");

module.exports = {
    async createComment(req, res, next) {
        try {
            //const profile_id = req.params.profile_id;
            const body = req.body;
            let result = await createComment(body);
            return res.status(200).json({
                code: 0,
                message: '',
                data: result,
            });
        } catch (error) {
            next(error)
        }
    },

    async getComments(req, res, next) {
        try {
            let duty_id = req.query.duty_id;

            let result = await getComments(duty_id);
            return res.json({
                code: 0,
                message: '',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },
}