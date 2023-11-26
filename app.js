require("dotenv").config();
const express = require('express');
const app = express();
const utils = require("./utils")
const bodyParser = require('body-parser');




app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,socketid,version');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use("/services", require("./services/router"));
app.use("/users", require("./users/router"));
app.use("/sector", require("./sector/router"));
app.use("/duty", require("./duty/router"));
app.use("/document", express.static("document/doc"));
app.use("/general", require("./general/router"));
app.use("/mission", require("./mission/router"));
app.use(utils.errorHandler)

let msg = process.env.NODE_ENV == 'DEV' ? 'Too Quality server Dev v1 ' : 'Too Quality  server Prod v ';
app.get('/', (req, res) => {
    res.send(msg);
});

app.listen(3000, () => {
    msg,
        console.log(msg,);
});
