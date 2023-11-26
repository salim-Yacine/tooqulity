const utils = require("../utils")
// salim unutma // mailgen, multer, nodmailer express-validation ve fs install et////
const create = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = "";
            let resulte;
            resulte = await utils.getQueryResults(`select id from users where email = ?`, [data.email]);
            // console.log(resulte)
            if (resulte.lenght > 0)
                throw new Error("user allrady exit");


            sql = `insert into users (name, surname, phone, email, password, type) VALUES (?,?,?,?,?,?)`;
            resulte = await utils.getQueryResults(sql, [
                data.name,
                data.surname,
                data.phone,
                data.email,
                data.password,
                2,

            ]);
            //console.log(data)
            resolve(data);

        } catch (error) {
            return reject(error);

        }
    });
}
const getUser = (id, sponsor_id, service_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = [];
            let sql = `SELECT u.id, u.name, u.surname, u.email, u.phone, concat(sponsor.name," ",sponsor.surname) as sponsor_name, u.password,
            u.sponsor_id, u.usertoken, sponsor.code as sponsor_code, s.name As service, u.type, u.code AS user_code, u.isabonned FROM users u
            LEFT JOIN users sponsor ON sponsor.id = u.id
            LEFT JOIN services s ON s.id = u.service_id
            WHERE TRUE`;
            if (id) {
                sql += ` AND u.id = ?`
                params.push(id)
            }
            if (sponsor_id) {
                sql += ` AND sponsor.sponsor_id = ?`
                params.push(sponsor_id)

            }
            if (service_id) {
                sql += ` AND s.service_id= ?`
                params.push(service_id)

            }

            let results = await utils.getQueryResults(sql, params);

            resolve(results);
        } catch (error) {
            return reject(error);
        }
    });
}
const getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getUser(id));
        } catch (error) {
            return reject(error);

        }
    });
}
const updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let params = [data.name,
            data.email,
            data.phone,
            data.id];
            let sql = `update users set name=?, email=?, phone=? where id = ?`;
            let results = await utils.getQueryResults(sql, params);
            resolve(results);


        } catch (error) {
            return reject(error);

        }

    })
}
//// admin panell
const isabonned = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = await utils.getQueryResults(`Select id from users where email = ?`, [data.email])
            if (results.lenght > 0) throw new Error("User record not found please create an account")
            let id = results.id;
            let sql = `UPDATE users SET isabonned=?, sponsor_id=?, type=? WHERE id=?`;
            await utils.getQueryResults(sql, [1, data.sponsor_id, 3, id]);
            resolve(data);
        } catch (error) {
            return reject(error);
        }
    });
}
const cangivmission = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await utils.getQueryResults(`update users set cangivemission = ?, type = ? where id = ?`, [1, 1, data.id])
            resolve(data);

        } catch (error) {
            return reject(error);
        }
    });
}
const endAbonnemnent = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await utils.getQueryResults(`update users set isabonned = NULL where sponsor_id = ?`, [data.sponsor_id]);
            resolve(data);
        } catch (error) {
            return reject(error);
        }
    });
}
/// end Admin //////
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `delete from users where id = ?`;
            let results = await utils.getQueryResults(sql, [id]);

            resolve(results);
        } catch (error) {
            return reject(error);
        }
    });
}
const getUserByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `SELECT * FROM users WHERE email = ?`;
            let results = await utils.getQueryResults(sql, [email]);

            resolve(results);

        } catch (error) {
            return reject(error);
        }
    })
}
const resetpass = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `update users set password=? where id = ?`;
            let results = await utils.getQueryResults(sql, [data.pass1, data.id]);
            resolve(results);

        } catch (error) {
            return reject(error);
        }
    });

}
const insertToken = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await utils.getQueryResults(`update usera set token=? where id =?`, [data.token])
            resolve(result);
        } catch (error) {
            return reject(error);

        }
    })
}
module.exports = {
    create, getUser, getUserById, updateUser, deleteUser, getUserByEmail, resetpass, isabonned, cangivmission, endAbonnemnent, insertToken
}