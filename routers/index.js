const router = require('express').Router()
const bookRouter = require('./bookRouter')
const StudentController = require('../controllers/userController')
const errorHanddler = require('../middleware/errorHandler')



router.post('/register', StudentController.register)
router.post('/login', StudentController.login)

router.use('/', bookRouter)
router.use(errorHanddler)

module.exports = router