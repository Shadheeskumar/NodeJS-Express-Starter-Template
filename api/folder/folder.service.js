const db = require('../../config/database')
const { v4: uuidv4 } = require('uuid');
var moment = require('moment');

module.exports = {
    post: (data, userId, callBack) => {
        const uid = userId.uid
        db.query(`
            INSERT INTO table (
                data,
            )
            VALUES (?)
        `,
            [
                moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                else {
                    return callBack(null, results)
                }
            }
        )
    },
    get: (data, userId, callBack) => {
        const uid = userId.uid
        db.query(`
            SELECT data
            FROM table
            WHERE variable = ?
        `,
            [
                data.variable,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                else {
                    return callBack(null, results)
                }
            }
        )
    },
    update: (data, userId, callBack) => {
        const uid = userId.uid
        db.query(`
            UPDATE table SET
                data = ?,
            WHERE variable = ?
        `,
            [
                moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                data.variable,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                else {
                    return callBack(null, results)
                }
            }
        )
    }
}