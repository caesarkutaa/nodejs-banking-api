const express = require('express')
const router = express.Router()


//controllers
const {signupUser, loginUser, updateUser, deleteUser,getAccount,updateBalance} = require('../controllers/user-controllers')
const  auth  = require('../middleware/authentication')

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.put('/:id', auth, updateUser)
router.delete('/:id',auth, deleteUser)
router.get('/:id',auth,getAccount)
router.put('/updatebal/:id', auth, updateBalance)







module.exports = router;