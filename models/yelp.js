var mongoose = require("mongoose");


var yelpSchema= new mongoose.Schema({
        
        business:{}
});


module.exports=mongoose.model("yelp",yelpSchema);
