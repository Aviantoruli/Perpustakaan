const { Student } = require('../models')
const { encode, decode } = require('../helpers/bcryptjs')
const { sign } = require('../helpers/jwt')

class StudentController {

    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body
            const encodePass = encode(password)
            const newUser = await Student.create({ name, email, password: encodePass })
            res.status(201).json({ newUser })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const userLogin = await Student.findOne({
                where: { email }
            })
            if (!userLogin) {
                throw {
                    name: 'Unauthenticated',
                    code: 401,
                    message: "Email / Password incorrect"
                }
            }
            const checkPass = decode(password, userLogin.password)
            if (!checkPass) {
                throw {
                    name: 'Unauthenticated',
                    code: 401,
                    message: "Email / Password incorrect"
                }
            }
            const access_token = sign({
                id:userLogin.id,
                email:userLogin.email
            })
            res.status(200).json({access_token})
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = StudentController