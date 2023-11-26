
const { query } = require("express");
const { create, getAll, getById, updateMission, deleteMission } = require("./service");

module.exports = {

    async createMission(req, res, next) {
        try {
            let body = req.body;
            let results = await create(body);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error)

        }
    },

    async getMission(req, res, next) {
        try {
            let id = req.query.id;
            let user_id = req.query.user_id;
            let duty_id = req.query.duty_id;
            let profile_id = req.query.profile;
            let status = req.query.stasus;
            let results = await getAll(id, user_id, duty_id, profile_id, status);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error);

        }
    },
    async getById(req, res, next) {
        try {
            let id = req.query.id;
            let results = await getById(id);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error);
        }
    },

    async updateMission(req, res, next) {
        try {
            let body = req.body;
            let results = await updateMission(body);
            return res.json({
                code: 0,
                message: "",
                data: results
            });

        } catch (error) {
            next(error);

        }
    },
    async deleteMission(req, res, next) {
        try {
            let duty_id = req.query.duty_id;
            let results = await deleteMission(duty_id);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error);
        }
    }
}