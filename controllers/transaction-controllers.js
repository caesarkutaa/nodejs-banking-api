const Transaction = require('../models/transaction.model');
const Account = require('../models/account.model');
 

const createTransaction = async(req,res)=>{
  
  const { fromAccount, toAccount, amount } = req.body;
  try {
  

    const fromAccountid = await Account.findOne({AccountNumber:fromAccount});
    console.log(fromAccount);
    if (!fromAccount) return res.status(404).send({ error: 'From account not found' });
    if (fromAccountid.balance < amount) return res.status(400).send({ error: 'Insufficient balance' });
    console.log(fromAccountid.balance);
    const toAccountid = await Account.findOne({AccountNumber:toAccount});
    if (!toAccount) return res.status(404).send({ error: 'To account not found' });

    fromAccountid.balance -= amount;
    toAccountid.balance += amount;

    const transaction =  Transaction.create({ fromAccount, toAccount, amount });


    res.status(200).json({msg:'Transfer sent successfully'})
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
  
}






// get all tranfers
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('fromAccount');
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports ={
  createTransaction,
  getTransactions
}