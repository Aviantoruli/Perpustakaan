const { Book, Transaction, sequelize } = require('../models')

class BookController {

    static async createBook(req, res, next) {
        try {
            const { name } = req.body
            const newBook = await Book.create({ name })
            res.status(201).json({ newBook })
        } catch (err) {
            next(err)
        }
    }

    static async borrow(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const { BookId, year, month, day } = req.body
            const bookCheck = await Book.findOne({id:BookId})
            if (!bookCheck) {
                throw{
                    name:"Not Found",
                    message:"Book Not Found"
                }
            }
            if (bookCheck.status === "dipinjam") {
                throw{
                    name:"Transaction error",
                    message:"Buku Sedang dipinjam"
                }
            } else {
                const newTransaction = await Transaction.create({ BookId, StudentId: req.user.id }, {
                    transaction: t
                })
                const updateBook = await Book.update({ borrow: `${year}-${month}-${day}`, status: "dipinjam", borrowerId:req.user.id }, {
                    where: { id: BookId },
                    transaction: t
                })
                if (newTransaction && updateBook) {
                    await t.commit()
                    res.status(200).json({ newTransaction })
                }
            }
        } catch (err) {
            await t.rollback()
            next(err)
        }
    }

    static async return(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const { BookId, year, month, day } = req.body
            const returnedBook = await Book.findOne({id:BookId})
            if (!returnedBook) {
                throw{
                    name:"Not Found",
                    message:"Book Not Found"
                }
            }
            if (returnedBook.borrowerId !== req.user.id) {
                throw{
                    name:"Forbidden",
                    message:"id anda tidak terdaftar dalam daftar buku yang dipinjam"
                }
            } else {
                const newTransaction = await Transaction.create({ BookId, StudentId: req.user.id }, {
                    transaction: t
                })
    
                const updatedBook = await Book.update({ return: `${year}-${month}-${day}`, status: "tersedia", borrowerId: 0 }, {
                    where: { id: BookId },
                    returning: true,
                    transaction: t
                })
    
                let pinjam = new Date(updatedBook[1][0].dataValues.borrow)
                let kembali = new Date(updatedBook[1][0].dataValues.return)
                let result = Math.abs(kembali - pinjam)
                let days = result / (1000 * 3600 * 24)
                let denda = 0
                
                days > 3 ? denda = (days - 3) * 5000 : denda = 0
                
                let rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(denda)
                if (newTransaction && updatedBook) {
                    await t.commit()
                    res.status(201).json({
                        name:`${req.user.name}`,
                        message:`denda yang ditanggung sebesar ${rupiah}`
                    })
                }
            }

        } catch (err) {
            await t.rollback()
            next(err)
        }
    }

}

module.exports = BookController