const express = require('express')
const router = express.Router()

const {createAccount, getAccount, updateBalance} = require('../controllers/account-controllers')
const auth = require('../middleware/authentication')


router.post('/createacc', auth,createAccount)
router.get('/:id',auth,getAccount)
router.put('/:id', auth, updateBalance)


module.exports = router