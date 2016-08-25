var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var yelpSchema= new mongoose.Schema({
        
        business:Object
       
});

yelpSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("yelp",yelpSchema);
