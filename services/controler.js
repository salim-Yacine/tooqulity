const { create, getService, getServiceById, updateService, deleteService } = require("./service");

module.exports = {
    async createService(req, res, next) {
        try {
            let body = req.body
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
    async getServices(req, res, next) {
        try {
            let id = req.query.id;
            let sector_id = req.query.sector_id;
            let results = await getService(id, sector_id);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error)
        }
    },
    async getService(req, res, next) {
        try {
            const id = req.params.id;
            let results = await getServiceById(id);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error);
        }
    },
    async updateServices(req, res, next) {
        try {
            let body = req.body;
            let results = await updateService(body);
            return res.json({
                code: 0,
                message: "",
                data: results
            })
        } catch (error) {
            next(error)
        }
    },
    async deleteServices(req, res, next) {
        try {
            let id = req.params.id
            let results = await deleteService(id);
            return res.json({
                code: 0,
                message: "",
                data: results
            });

        } catch (error) {
            next(error)
        }
    },
}