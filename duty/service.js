
const utils = require("../utils");

const create = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = '';
            let result;
            let params = [data.listname, data.title, data.details, data.profile_id, data.service_id, data.list];
            sql += `insert into duty(listname, title,  details, profile_id, service_id, list) VALUES (?, ?, ?, ?, ?, ?)`;

            result = await utils.getQueryResults(sql, params);
            data.id = result.insertId
            resolve(data);

            console.log(data)

        } catch (error) {
            return reject(error);
        }
    });
}


const createToduList = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let result = await utils.getQueryResults(`update duty set list = ? where id =?`, [data.list, data.id]);
            resolve(data);
        } catch (error) {
            return reject(error);

        }
    })
}

const duty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await utils.getQueryResults(`update duty set priority = ?, andDate= ? where id =?`, [data.priority, data.andDate, data.id]);
            resolve(data);
        } catch (error) {
            return reject(error);
        }
    })
}
const getAll = (id, profile_id, service_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = [];
            let sql = `SELECT d.id, d.title,  us.name AS profile_name, d.details, d.iscommented, user.name AS confirmed_user_name, d.status, d.listname, d.list, s.name AS service_name, d.andDate, d.priority FROM duty d 
            LEFT JOIN users us ON us.id = d.profile_id
            LEFT JOIN users user ON user.id = d.confirmed_user_id
            LEFT JOIN services s ON s.id = d.service_id WHERE TRUE`;
            if (id > 0) {
                params.push(id)
                sql += ` AND d.id = ?`
            }
            if (profile_id > 0) {
                params.push(profile_id)
                sql += ` AND d.profile_id = ?`
            }
            if (service_id > 0) {
                params.push(service_id)
                sql += ` AND d.service_id = ?`
            }
            let result = await utils.getQueryResults(sql, params);
            resolve(result);
        } catch (error) {
            return reject(error);
        }
    });
}

const getById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getAll(id));
        } catch (error) {
            return reject(error);
        }
    });
}


const updateDuty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = [data.title, data.profile_id, data.service_id, data.andDate, data.priority, data.id];
            let sql = `update duty set title = ?, profile_id =?,service_id =?, andDate = ?, priority = ?`;
            await utils.getQueryResults(sql, params);
            resolve(data);
        } catch (error) {
            return reject(error);

        }
    });
}

const deleteDuty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await utils.getQueryResults(`delete FROM duty WHERE id = ?`, [id]);
            resolve(result);
        } catch (error) {
            return reject(error);
        }
    });
}

const dutyStatus = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await utils.getQueryResults(`update duty set status = ? where id = ?`, [data.status, data.id])
            resolve(data);
        } catch (error) {
            return reject(error);
        }
    });
}



module.exports = {
    create, getAll, getById, updateDuty, deleteDuty, dutyStatus,
    createToduList, duty
}