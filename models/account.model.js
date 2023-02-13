const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  AccountNumber: {
    type: String,
    unique:true,
    minlength: 10,
    maxlength: 10,
  },
  balance: {
    type: Number,
    default: 0
  }
});


accountSchema.pre('save', async function (next) {
  const randomInteger = () => {
    return Math.floor(Math.random() * 9000000000) + 1000000000
  };
  this.AccountNumber = randomInteger().toString()
  next();
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
