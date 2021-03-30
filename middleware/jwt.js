const fs = require('fs')
const db = require('../config/database')
const { sign, verify } = require('jsonwebtoken')

var privateKey = fs.readFileSync('./private.key', 'utf8')
var publicKey = fs.readFileSync('./public.key', 'utf8')

const { v4: uuidv4 } = require('uuid')

module.exports = {
    createAccessToken: (results) => {
        const tokenId = uuidv4()

        var payload = {
            user: results,
            id: tokenId,
        };

        var issuer = 'Name'
        var subject = 'AccessToken'

        var signOptions = {
            issuer: issuer,
            subject: subject,
            expiresIn: "1h",
            algorithm: "RS256"
        }

        const jsonwebtoken = sign(payload, privateKey, signOptions)
        return jsonwebtoken
    },
    createRefreshToken: (results) => {
        const tokenId = uuidv4()

        var payload = {
            user: results,
            id: tokenId,
        };

        var issuer = 'Name';
        var subject = 'RefreshToken'

        var signOptions = {
            issuer: issuer,
            subject: subject,
            expiresIn: "30d",
            algorithm: "RS256"
        }

        const jsonwebtoken = sign(payload, privateKey, signOptions)
        return jsonwebtoken
    },
    checkAccessToken: (req, res, next) => {
        var issuer = 'Name';
        var subject = 'AccessToken'

        var verifyOptions = {
            issuer: issuer,
            subject: subject,
            expiresIn: "1h",
            algorithm: ["RS256"]
        };

        let token = req.get("Authorization")
        if (token) {
            token = token.slice(7)
            verify(token, publicKey, verifyOptions, (err, decoded) => {
                if (err) {
                    return res.status(500).json({
                        status: 'Error',
                        success_message: null,
                        error_message: 'Invalid Token',
                        result: { data: null }
                    })
                }
                else {
                    req.user = decoded.id
                    console.log(decoded.id)
                    next()
                }
            })
        }
        else {
            return res.status(500).json({
                status: 'Error',
                success_message: null,
                error_message: 'Not Authorized',
                result: { data: null }
            })
        }
    },
    checkRefreshToken: (req, res, next) => {
        var issuer = 'Name'
        var subject = 'RefreshToken'

        var verifyOptions = {
            issuer: issuer,
            subject: subject,
            expiresIn: "30d",
            algorithm: ["RS256"]
        };

        let token = req.get("Authorization")
        if (token) {
            token = token.slice(7)
            verify(token, publicKey, verifyOptions, (err, decoded) => {
                if (err) {
                    return res.status(500).json({
                        status: 'Error',
                        success_message: null,
                        error_message: 'Invalid Token',
                        result: { data: null }
                    })
                }
                else {
                    console.log(decoded)
                    next()
                }
            })
        }
        else {
            return res.status(500).json({
                status: 'Error',
                success_message: null,
                error_message: 'Not Authorized',
                result: { data: null }
            })
        }
    }
}