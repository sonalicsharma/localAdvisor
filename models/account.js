var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Accounts = new Schema({
    username: String,
    password: String
});

Accounts.plugin(passportLocalMongoose);

module.exports = mongoose.model('Accounts', Accounts);
