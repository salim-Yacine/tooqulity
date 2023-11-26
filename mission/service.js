const utils = require("../utils");

const create = async (data) => {
    return new Promise(async (resolve, rejecte) => {
        try {
            let user_ids = data.user_id;

            for (const user_id of user_ids) {
                let sql = `INSERT INTO mission (duty_id, user_id, profile_id) VALUES (?, ?, ?);`;
                let params = [data.duty_id, user_id, data.profile_id];

                await utils.getQueryResults(sql, params);
                //console.log("data", user_id);
            }
            resolve(data);

        } catch (error) {
            return rejecte(error);

        }
    });
}

const getAll = async (id, user_id, duty_id, profile_id, status) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = [];
            let sql = `SELECT m.id, m.duty_id, m.user_id, d.title AS duty_title, d.details AS duty_details, d.status, d.priority, d.andDate, d.iscommented, u.name AS user_name, profile.name as profile_name FROM mission m 
            LEFT JOIN duty d ON d.id = m.duty_id
            LEFT JOIN users u ON u.id = m.user_id
            LEFT JOIN users profile ON profile.id = m.profile_id
            
            WHERE (1+1)`;
            if (id) {
                sql += ` AND m.id = ?`
                params.push(id)
            }
            if (user_id) {
                sql += ` AND m.user_id IN (?)`
                params.push(user_id)
            }
            if (duty_id) {
                sql += ` AND m.duty_id = ?`
                params.push(duty_id)
            }
            if (profile_id) {
                sql += ` AND m.profile_id = ?`
                params.push(duty_id)
            }
            sql += ` ORDER BY -d.createdat ASC`

            let results = await utils.getQueryResults(sql, params);


            resolve(results);
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

const updateMission = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `update mission set user_id=? where id = ?`;
            await utils.getQueryResults(sql, [data.user_id, data.id])
            resolve(data);

        } catch (error) {
            return reject(error);

        }
    });
}

const deleteMission = (duty_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `delete * FROM mission where duty_id = ?`;
            let result = await utils.getQueryResults(sql, [duty_id]);
            resolve(result);
        } catch (error) {
            return reject(error);

        }
    });
}
module.exports = {
    create, getAll, getById, updateMission, deleteMission
}