const { query } = require("express");
const { getDocumment, getDocById, uploadDoc,
    updateDoc, deleteDoc } = require("./service");

module.exports = {
    async getAll(req, res, next) {
        try {
            let user_id = req.query.user_id;
            let profile_id = req.query.profile_id;
            let duty_id = req.query.duty_id;
            let id = req.query.id;
            let results = await getDocumment(id, user_id, profile_id, duty_id);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error)
        }
    },

    async getDoc(req, res, next) {
        try {
            const id = req.params.id;
            let results = await getDocById(id);
            return res.json({
                code: 0,
                message: "",
                data: results
            });

        } catch (error) {
            next(error)
        }
    },

    async uploadFile(req, res, next) {
        try {
            let body = req.body;
            let file = req.file.filename;
            let results = await uploadDoc(file, body);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error)
        }

    },

    async updateFile(req, res, next) {
        try {
            let body = req.body;
            let file = req.file.filename;
            let results = await updateDoc(file, body);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error)
        }
    },

    async deleteFile(req, res, next) {
        try {
            let body = req.body
            let results = await deleteDoc(body);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error)
        }
    }
}    