
const utils = require("../utils");


const create = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = [data.code, data.name];
            let sql = `insert into sector(code, name) VALUES (?,?)`;
            let resulte = await utils.getQueryResults(sql, params);
            resolve(data);

        } catch (error) {
            return reject(error);

        }

    });
}

const getSector = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `SELECT * FROM sector`;
            let resulte = await utils.getQueryResults(sql, []);

            resolve(resulte);

        } catch (error) {
            return reject(error);
        }
    });
}

const getSectorByİd = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `SELECT * FROM sector WHERE id =?`;
            let resulte = await utils.getQueryResults(sql, [id]);

            resolve(resulte);

        } catch (error) {
            return reject(error);

        }
    });
}

const updateSector = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = [data.code, data.name, data.id];
            let sql = `update sector set code=?, name=? where id = ?`;
            let resulte = await utils.getQueryResults(sql, params);

            resolve(resulte);
        } catch (error) {
            return reject(error);
        }
    });
}

const deleteSector = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `delete from sector where id = ?`;
            let results = await utils.getQueryResults(sql, [id]);

            resolve(results);
        } catch (error) {
            return reject(error);
        }
    });
}

module.exports = {
    create, getSector, getSectorByİd, updateSector, deleteSector
}