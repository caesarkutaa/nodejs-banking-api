const express = require('express')
const router = express.Router()


//controllers
const {signupUser, loginUser, updateUser, deleteUser,getAccount,updateBalance} = require('../controllers/user-controllers')
const  auth  = require('../middleware/authentication')

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.put('/:id', auth, updateUser)
router.delete('/:id',auth, deleteUser)








module.exports = router;