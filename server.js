require('dotenv').config()

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require("./app/config/routes");

app.use('/public/images', express.static('./uploads/'));

app.get("/", (req, res) => res.send("hellow"));

app.use('/api', router);

app.use((req, res, next) => {
    let err = new Error('URL Not Found!')
    err.status = 404
    next(err);
});

app.use((err, req, res, next) => {
    let response = {
        status: err.status,
        message: err.message,
        data: []
    }

    return res.status(err.status).json(response);
});


app.listen(PORT, () => console.log(`Aplikasi berjalan di port: ${PORT}`));
