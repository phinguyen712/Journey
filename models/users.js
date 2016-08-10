var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var usersSchema= new mongoose.Schema({
        username: String,
        password: String,
        favorites: [String],
        schedule:[String]

});

usersSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",usersSchema);
