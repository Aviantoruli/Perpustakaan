const router = require('express').Router()
const BookController = require('../controllers/bookController')
const { authe } = require('../middleware/authentication')


router.post('/createBook', BookController.createBook)
router.post('/borrow', authe, BookController.borrow)
router.post('/return', authe, BookController.return)

module.exports = router