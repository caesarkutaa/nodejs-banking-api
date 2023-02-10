const Transaction = require('../models/transaction.model');
const Account = require('../models/account.model');

//send money
const createTransaction = async (req, res) => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;

    const fromAccount = await Account.findById(fromAccountId);
    if (!fromAccount) return res.status(404).send({ error: 'From account not found' });
    if (fromAccount.balance < amount) return res.status(400).send({ error: 'Insufficient balance' });

    const toAccount = await Account.findById(toAccountId);
    if (!toAccount) return res.status(404).send({ error: 'To account not found' });

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    const transaction = new Transaction({ fromAccount, toAccount, amount });
    await transaction.save();

    await fromAccount.save();
    await toAccount.save();

    res.status(200).json(transaction)
  } catch (error) {
    res.status(400).send(error);
  }
};


// get all tranfers
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ fromAccount: req.params.accountId }, { toAccount: req.params.accountId }]
    }).populate('fromAccount toAccount');
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports ={
  createTransaction,
  getTransactions
}