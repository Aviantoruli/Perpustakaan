const { verify } = require('../helpers/jwt')
const { Student } = require('../models')

const authe = async (req, res, next) => {
    try {
        const token = req.headers.access_token
        if (!token) {
            throw {
                name: 'Unauthenticated',
                message: 'Invalid Token'
            }
        }
        const payload = verify(token)
        const userCheck = await Student.findOne({
            where: {
                id: payload.id,
                email: payload.email
            }
        })
        if (!userCheck) {
            throw {
                name: 'Unauthenticated',
                message: 'Invalid Token'
            }
        } else {
            req.user = { id: userCheck.id, name: userCheck.name, email: userCheck.email }
            next()
        }
    } catch (err) {
        next(err)
    }
}


module.exports = { authe }