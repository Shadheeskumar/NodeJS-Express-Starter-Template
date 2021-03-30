var admin = require('firebase-admin')
var serviceAccount = require('../adminSDK.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "URL"
})

module.exports = {
    verifyFirebaseToken: (req, res, next) => {
        let token = req.get("Authorization")
        if (token) {
            token = token.slice(7)
            admin.auth().verifyIdToken(token)
                .then((decodedToken) => {
                    const uid = decodedToken;
                    req.uid = uid
                    next()
                })
                .catch((error) => {
                    console.log(error)
                    if (error.errorInfo.code == 'auth/id-token-expired') {
                        return res.status(200).json({
                            status: 'Error',
                            success_message: null,
                            error_message: 'Token Expired',
                            result: { data: null }
                        })
                    }
                    if (error.errorInfo.code == 'auth/argument-error') {
                        return res.status(200).json({
                            status: 'Error',
                            success_message: null,
                            error_message: 'Malformed Token',
                            result: { data: null }
                        })
                    }
                    else {
                        return res.status(200).json({
                            status: 'Error',
                            success_message: null,
                            error_message: 'Token Error',
                            result: { data: null }
                        })
                    }

                });
        }
        else {
            return res.status(200).json({
                status: 'Error',
                success_message: null,
                error_message: 'Unauthorized',
                result: { data: null }
            })
        }

    }
}


