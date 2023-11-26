const { create, getAll, getById, updateDuty, deleteDuty, dutyStatus, createToduList, duty } = require("./service");

module.exports = {
    async createDuty(req, res, next) {
        try {
            const body = req.body;
            let results = await create(body);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error);
        }
    },
    async getduty(req, res, next) {
        try {

            let profile_id = req.query.profile_id;
            let service_id = req.query.service_id;
            let id = req.query.id;
            let results = await getAll(id, profile_id, service_id);
            return res.json({
                code: 0,
                message: "",
                data: results
            });

        } catch (error) {
            next(error)
        }
    },

    async getDutyById(req, res, next) {
        try {
            let id = req.params.id;
            let results = await getById(id);
            return res.json({
                code: 0,
                message: "",
                data: results
            });

        } catch (error) {
            next(error)
        }
    },

    async createToduLists(req, res, next) {
        try {
            let body = req.body;
            let results = await createToduList(body);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error);

        }
    },

    async dutyDate(req, res, next) {
        try {
            let body = req.body;
            let results = await duty(body);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error);
        }
    },
    async updateDutys(req, res, next) {
        try {
            let body = req.body;
            let results = await updateDuty(body);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error);
        }
    },

    async deleteDutys(req, res, next) {
        try {
            let id = req.params.id;
            let results = await deleteDuty(id);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error);
        }
    },

    async dutyStatus(req, res, next) {
        try {
            let body = req.body;
            let results = await dutyStatus(body);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error);
        }
    },

}