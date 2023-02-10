const express = require('express')
const router = express.Router()

const {createAccount, getAccount, updateBalance} = require('../controllers/account-controllers')

router.post('/createacc',createAccount)
router.get('/:id',getAccount)
router.patch('/updatbal', updateBalance)


module.exports = router