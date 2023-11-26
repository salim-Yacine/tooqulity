const utils = require("../utils");

const getComments = async (duty_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = [duty_id];
            let sql = `SELECT * FROM comment WHERE duty_id= ?`;

            const results = await utils.getQueryResults(sql, params);
            resolve(results);
        } catch (error) {
            return reject(error);
        }
    });
}

const createComment = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            /*let results = await utils.getQueryResults('SELECT customer_id FROM reservation WHERE id = ?', [data.reservation_id]);
            const customer_id = results[0].customer_id;*/
            const sql = `INSERT INTO comment (review, sender_id, duty_id, profile_id) VALUES (?,?,?,?);`;
            let results = await utils.getQueryResults(sql, [data.review, data.sender_id, data.duty_id, data.profile_id]);

            await utils.getQueryResults(`UPDATE duty SET iscommented = 1 WHERE id = ?`, [data.duty_id]);

            resolve(data);
        } catch (error) {
            return reject(error);
        }
    });
}



module.exports = {
    createComment, getComments
}