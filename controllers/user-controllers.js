const User = require('../models/user.models')
//Signup user
const signupUser = async(req,res)=>{
    const emailExist = await User.findOne({ email: req.body.email }); //returns the first document that matches the query criteria or null
      if (emailExist) return res.status(400).json({ message: "Email already exist!" });
         try {
            const  user =  await User.create({...req.body})
             res.status(200).json(user)
        } catch (error) {
        res.status(500).json(error)
    }
}
// login user
const loginUser = async(req,res)=>{
    ///checking if the user has email and password
 const {email,password} = req.body
   if(!email || !password){
    res.status(403).json('please provide email and password')
   }
    const user =  await User.findOne({ email })
    //checking if there is a user
    if(!user){
        res.status(403).json('Invalid User')
    } 
  ///checking if the user password is correct by using bcrypt.compare
    const ispasswordcorrect = await user.checkpassword(password)
    if(!ispasswordcorrect){
        res.status(403).json('Invalid Password')
    }
    //sending the user name and token
    const token = user.createjwt()
    res.status(201).json({user:{name:user.firstname}, token})
} 

//updating a user
const updateUser =  async (req,res)=>{
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},
          {new:true})
          res.status(200).json({msg:'User updated successfully'})
    } catch (error) {
      res.status(500).json(error)
    }
  
}
///deleting user
const deleteUser = async(req,res)=>{
    try {
        const deleteuser = await User.findByIdAndDelete(req.params.id)
            res.status(200).json({msg:'user has been deleted....'})
      } catch (error) {
        res.status(500).json(error)
      }
}
//update balance
const updateBalance = async (req, res) => {
  try {
    const account = await User.findByIdAndUpdate( req.params.id,{$set:req.body},
      {new:true} );
    if (!account) return res.status(404).send({ error: 'Account not found' });

    res.status(200).json({account, msg:'Update successfuly'});
  } catch (error) {
    res.status(400).send(error);
  }
};

//get account
const getAccount = async (req, res) => {
  try {
    const account = await User.findById( req.params.id );
    if(!account){
    res.status(404).send({ error: 'Account not found' });
  }

    res.status(200).json(account);
  } catch (error) {
    res.status(400).send({ error: 'Account not found' });
  }
};



module.exports ={
    signupUser,
    loginUser,
    updateUser,
    deleteUser,
    getAccount,
    updateBalance
}