

const utils = require("../utils");
const fs = require("fs");


const getDocumment = (id, profile_id, user_id, duty_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = [];
            let sql = `SELECT doc.id, doc.user_id, doc.profile_id, doc.duty_id,  us.name As user_name, user.name As profile_name d.title As duty_title 
            FROM documment doc
            LEFT JOIN users us ON us.id = doc.user_id
            LEFT JOIN users user ON user.id = doc.profile_id
            LEFT JOIN duty d ON d.id = doc.duty_id
            WHERE TRUE`;
            if (id > 0) {
                params.push(id)
                sql += ` AND doc.id = ?`
            }
            if (profile_id > 0) {
                params.push(profile_id);
                sql += ` AND profile_id = ?`
            }
            if (user_id > 0) {
                params.push(user_id);
                sql += ` AND user_id = ?`
            }
            if (duty_id > 0) {
                params.push(duty_id);
                sql += ` AND duty_id = ?`
            }

            let result = await utils.getQueryResults(sql, params);
            resolve(result);
        } catch (error) {
            return reject(error);
        }
    });
}

const getDocById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getDocumment(id));
        } catch (error) {
            return reject(error);
        }
    })
}

const uploadDoc = (file, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fileName;

            // let id = data.duty_id;
            let params = [file, data.user_id, data.profile_id, data.duty_id];
            let sql = `insert into documment(path, user_id, profile_id, duty_id) VALUES (?, ?, ?, ?, ?, ?)`;
            let result = await utils.getQueryResults(sql, params);
            resolve(data);

        } catch (error) {
            return reject(error);
        }
    });
}
const updateDoc = (file, data) => {
    return new Promise(async (resolve, rejects) => {
        try {
            let fileName;
            let id = data.id;
            let params = [file, id];
            let sql;
            let result = await utils.getQueryResults(`SELECTE path FROM document WHERE id = ?`, id);
            if (result.length == 0) {
                throw new Error("Record not found");

            }
            fileName = result[0].path
            sql = `update documment set path = ? where id = ?`;
            const diretoryPath = __dirname + "/doc/";
            if (fs.existsSync(diretoryPath + fileName)) {
                fs.unlinkSync(diretoryPath + fileName);
            }
            let results = await utils.getQueryResults(sql, params);
            resolve(data);


        } catch (error) {
            return rejects(error);

        }
    });
}

const deleteDoc = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fileName;

            let result = await utils.getQueryResults(`SELECTE path FROM document WHERE id = ?`, data.id);
            if (result.length == 0) {
                throw new Error("Record not found");

            }
            fileName = result[0].path
            const diretoryPath = __dirname + "/doc/";
            if (fs.existsSync(diretoryPath + fileName)) {
                fs.unlinkSync(diretoryPath + fileName);
            }
            let sql = `delete from documment where id = ?`;
            let results = utils.getQueryResults(sql, [data.id]);
            resolve(results);

        } catch (error) {
            return reject(error);
        }
    });
}

module.exports = {
    getDocumment, getDocById, uploadDoc,
    updateDoc, deleteDoc
}