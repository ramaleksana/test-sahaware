require('dotenv').config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

exports.isAuth = async (req, res, next) => {
    let userAgent = req.headers.authorization || undefined;

    if (userAgent === undefined) {
        res.status(401).json({
            status: 401,
            message: 'Failed for request',
            payload: null
        })
    } else {
        let token = userAgent.split('Bearer ');
        if (token[1]) {
            jwt.verify(token[1], SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).json({ status: 401, message: 'Failed to authenticate token', payload: null })
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            res.status(401).json({
                status: 401,
                message: 'No token provided.',
                payload: null
            });
        }
    }
}

exports.signAuth = async (data) => {
    let token = await jwt.sign(data, SECRET, { expiresIn: '8h' })
    return token;
}