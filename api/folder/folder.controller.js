const folderService = require('./folder.service')
const { createAccessToken } = require('../../middleware/jwt')

module.exports = {
    post: (req, res) => {
        const userId = req.uid
        const body = req.body
        folderService.post(body, userId, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(200).json({
                    status: 'Error',
                    success_message: null,
                    error_message: 'Unknown Error',
                    result: { data: null }
                })
            }
            else {
                return res.status(200).json({
                    status: 'Success',
                    success_message: 'Successful',
                    error_message: null,
                    result: { data: null }
                })
            }
        })
    },
    get: (req, res) => {
        const userId = req.uid
        const body = req.body
        folderService.get(body, userId, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(200).json({
                    status: 'Error',
                    success_message: null,
                    error_message: 'Unknown Error',
                    result: { data: null }
                })
            }
            if (results.length < 1) {
                return res.status(200).json({
                    status: 'Success',
                    success_message: 'Refunds Not Found',
                    error_message: null,
                    result: { data: null }
                })
            }
            else {
                return res.status(200).json({
                    status: 'Success',
                    success_message: 'Successful',
                    error_message: null,
                    result: { data: results }
                })
            }
        })
    },
    update: (req, res) => {
        const userId = req.uid
        const body = req.body
        folderService.update(body, userId, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(200).json({
                    status: 'Error',
                    success_message: null,
                    error_message: 'Unknown Error',
                    result: { data: null }
                })
            }
            if (!results) {
                return res.status(200).json({
                    status: 'Error',
                    success_message: null,
                    error_message: 'Update Failed',
                    result: { data: null }
                })
            }
            else {
                return res.status(200).json({
                    status: 'Success',
                    success_message: 'Successful',
                    error_message: null,
                    result: { data: null }
                })
            }
        })

    },
}