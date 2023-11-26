const { create, getSector, getSectorByİd, updateSector, deleteSector } = require("./service");

module.exports = {
    async createSector(req, res, next) {
        try {
            let body = req.body
            let results = await create(body);
            return res.json({
                code: 0,
                message: "",
                data: results
            })
        } catch (error) {
            next(error)

        }
    },

    async getAll(req, res, next) {
        try {
            let results = await getSector();
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error)

        }
    },
    async getSectors(req, res, next) {
        try {
            const id = req.params.id;
            let results = await getSectorByİd(id);
            return res.json({
                code: 0,
                message: "",
                data: results
            });

        } catch (error) {
            next(error)
        }
    },
    async updateSectors(req, res, next) {
        try {
            let body = req.body
            let results = await updateSector(body);
            return res.json({
                code: 0,
                message: "",
                data: results
            });

        } catch (error) {
            next(error)
        }
    },
    async deleteSectors(req, res, next) {
        try {
            let id = req.params.id
            let results = await deleteSector(id);
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