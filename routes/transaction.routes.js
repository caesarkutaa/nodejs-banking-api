const express = require('express')
const router = express.Router()

const { createTransaction, getTransactions } = require('../controllers/transaction-controllers')
const auth = require('../middleware/authentication')

router.post('/transfer', auth,createTransaction)
router.get('/', auth, getTransactions )

module.exports = router