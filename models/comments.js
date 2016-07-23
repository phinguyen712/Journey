 var mongoose                = require("mongoose");
 
 var commentsSchema= new mongoose.Schema({
        username: String,
        comment: String,
        title: String,
        date: String
        
});

module.exports=mongoose.model("comments",commentsSchema);