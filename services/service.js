const utils = require("../utils");

const create = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = [data.name, data.notes, data.sector_id];
            let sql = `insert into services(name, notes, sector_id) VALUES (?,?,?)`;
            let results = await utils.getQueryResults(sql, params);

            resolve(results);
            console.log(results)

        } catch (error) {
            return reject(error);

        }
    });
}

const getService = (id, sector_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = [];
            let sql = `SELECT s.id, s.name, s.notes, st.name AS sector_name FROM services s 
            LEFT JOIN sector st ON st.id = s.sector_id WHERE TRUE `;
            if (id > 0) {
                params.push(id)
                sql += ` AND s.id = ?`
            }
            if (sector_id > 0) {
                params.push(sector_id)
                sql += ` AND sector_id = ? `
            }
            let results = await utils.getQueryResults(sql, params);

            resolve(results);
        } catch (error) {
            return reject(error);
        }
    });
}

const getServiceById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getService(id));
        } catch (error) {
            return reject(error);
        }
    });
}
const updateService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = [data.name, data.notes, data.sector_id,
            data.id];
            let sql = `update services set name=?, notes=?, sector_id=? where id = ?`;
            let results = await utils.getQueryResults(sql, params);
            resolve(results);

        } catch (error) {
            return reject(error);

        }

    })
}

const deleteService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `delete from services where id = ?`;
            let results = await utils.getQueryResults(sql, [id]);

            resolve(results);
        } catch (error) {
            return reject(error);
        }
    });
}

module.exports = {
    create, getService, getServiceById, updateService, deleteService
}