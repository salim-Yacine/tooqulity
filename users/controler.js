const { create, getUser, getUserById, updateUser, deleteUser, getUserByEmail, resetpass, isabonned, cangivmission, endAbonnemnent, insertToken } = require("./service");

const { createHmac } = require('crypto');
const jwt = require('jsonwebtoken');
const { verify } = require('jsonwebtoken');

const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

//sercive unuttma salim
module.exports = {
    async createUsers(req, res, next) {
        try {
            let resulte;
            let id;
            // let email = req.body.email;
            let body = req.body;

            const secret = 'abcdefg';
            const hash = createHmac('sha256', secret).update(body.password).digest('hex');
            body.password = hash;
            resulte = await create(body);
            const newsecret = process.env.JWT_SECRET + resulte.password;
            // let lInsertId = resulte.insertId;
            // console.log(resulte.email);

            const payload = {
                email: resulte.email,
                id: resulte.insertId,
            }
            const token = jwt.sign(payload, newsecret, { expiresIn: '5m' });
            // const token = jwt.sign(payload, newsecret, { expiresIn: '360h' });

            return res.json({
                code: 0,
                message: "",
                data: resulte,
                token: token
            });
        } catch (error) {
            next(error)
        }
    },
    async getUsers(req, res, next) {
        try {
            let id = req.query.id;
            let sponsor_id = req.query.sponsor_id;
            let service_id = req.query.service_id;
            let results = await getUser(id, sponsor_id, service_id);

            return res.json({
                code: 0,
                message: "",
                data: results
            });

        } catch (error) {
            next(error)
        }
    },
    async getUserById(req, res, next) {
        try {
            const id = req.params.id;
            // let id = req.body.id
            let results = await getUserById(id);
            return res.json({
                code: 0,
                message: "",
                data: results
            });

        } catch (error) {
            next(error)
        }
    },
    async updateUsers(req, res, next) {
        try {
            let body = req.body


            let results = await updateUser(body);
            return res.json({
                code: 0,
                message: "",
                data: results
            });

        } catch (error) {
            next(error)
        }
    },
    async token(req, res, next) {
        try {
            let body = req.body;
            let results = await insertToken(body);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error)
        }
    },
    async deleteUsers(req, res, next) {
        try {
            let id = req.params.id
            let results = await deleteUser(id);
            return res.json({
                code: 0,
                message: "",
                data: results
            });

        } catch (error) {
            next(error)
        }
    },
    async login(req, res, next) {
        try {
            let body = req.body;
            const secret = 'abcdefg';
            const hash = createHmac('sha256', secret)
                .update(body.password)
                .digest('hex');
            body.password = hash;
            let results = await getUserByEmail(body.email);
            if (results[0].password == body.password) {
                results[0].password = undefined;
                return res.json({
                    code: 0,
                    message: "",
                    data: results
                });
            }


        } catch (error) {
            next(error)
        }
    },
    async isuserabonned(req, res, next) {

        try {
            let body = req.body;
            let results = await isabonned(body);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error);

        }
    },
    async isUserAutorized(req, res, next) {
        try {
            let body = req.body;
            let results = await cangivmission(body);
            return res.json({
                code: 0,
                message: "",
                data: results
            });
        } catch (error) {
            next(error);
        }
    },

    async resetPassword(req, res, next) {
        try {
            let body = req.body;

            if (body.pass1 != body.pass2) {

                return res.json({
                    code: 1,
                    message: "Şifreler aynı değil!",
                    data: null
                });
            }
            const secret = 'abcdefg';
            const hash = createHmac('sha256', secret)
                .update(body.pass1)
                .digest('hex');
            body.pass1 = hash

            let results = await resetpass(body);
            return res.json({
                code: 0,
                message: "",
                data: results
            });

        } catch (error) {
            next(error);
        }
    },
    async resetLink(req, res, next) {
        try {
            let email = req.body.email;
            let results;
            let id = "";
            let name
            results = await getUserByEmail(email);
            //  console.log(email)
            console.log(results[0].email)
            if (email != results[0].email) {
                return res.json({
                    code: 1,
                    message: "User not registered",
                    data: null
                });
            }
            id = results[0].id;
            name = results[0].name

            let config = {
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            }
            let transporter = nodemailer.createTransport(config);

            let MailGenerator = new Mailgen({
                theme: "default",
                product: {
                    name: "Arniva Fleet Manager ",
                    link: `http://localhost:5000/login`
                }
            })

            const secret = process.env.JWT_SECRET + results[0].password;
            const payload = {
                email: results[0].email,
                id: results[0].id
            }
            const token = jwt.sign(payload, secret, { expiresIn: '15m' });

            let response = {
                body: {
                    name: name,
                    intro: "Reset your password",
                    outro: `<p>Click on the link <a href = "http://localhost:5000/reset-password?id=${id}&token=${token}">ArnivaFleetManagerResetPassword</a> to reset your password</p>`
                }
            }

            let mail = MailGenerator.generate(response)

            let message = {
                from: process.env.EMAIL,
                to: email,
                subject: "Reset your password",
                html: mail
            }

            transporter.sendMail(message).then(() => {
                return res.status(201).json({
                    code: 0,
                    message: "password rest link has been sent to your email...",

                })
            })

        } catch (error) {
            next(error);
        }
    },
    async verifyToken(req, res, next) {
        try {
            let id = req.query.id;
            let token = req.query.token;
            let results = await getUserById(id);
            if (token) {
                const secret = process.env.JWT_SECRET + results[0].password;
                verify(token, secret, (err, decoded) => {
                    if (err) {
                        //  console.log(err)
                        res.json({
                            code: 1,
                            message: (err, "your free test is expired please go to abonned !!!"),
                            data: null
                        });

                    }
                    if (decoded) {
                        return res.json({
                            code: 0,
                            message: "",
                            data: decoded
                        });
                    }
                })
            }

        } catch (error) {
            next(error);
        }
    },
    async verifyAbonne(req, res, next) {
        try {
            let id = req.query.id;
            let token = req.query.token;

            let results = await getUserById(id);
            if (token) {
                const secret = process.env.JWT_SECRET + results[0].password;
                verify(token, secret, (err, decoded) => {
                    if (err) {
                        let body = req.body;
                        endAbonnemnent(body);
                        res.json({
                            code: 1,
                            message: "Your abonnement is expired please renew!!!",
                            data: null
                        });

                    } else {
                        return res.json({
                            code: 0,
                            message: "",
                            data: decoded
                        });
                    }
                })
            }

        } catch (error) {
            next(error);
        }
    }
}