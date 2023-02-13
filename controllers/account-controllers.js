const Account = require('../models/account.model');


//create a account
const createAccount = async (req, res) => {
  try {
    const account = await Account.create({ owner: req.user.userId });
    res.status(201).json(account);
  } catch (error) {
    res.status(400).send(error);
  }
};

//get account
const getAccount = async (req, res) => {
  try {
    const account = await Account.findOne({ owner: req.user.userId });
    if (!account) return res.status(404).send({ error: 'Account not found' });
    res.status(200).json(account);
  } catch (error) {
    res.status(400).send(error);
  }
};

//update balances
const updateBalance = async (req, res) => {
  const {balance} = req.body
  try {
    const account = await Account.updateOne({ owner: req.user.userId }, {$inc:{balance}},);
    if (!account) return res.status(404).send({ error: 'Account not found' });
   
    res.status(200).json({account, msg:'Update successfuly'});
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};


module.exports={
 createAccount,
 getAccount,
 updateBalance
}