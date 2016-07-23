 var mongoose                = require("mongoose");
 
 var journeySchema= new mongoose.Schema({
        name: String,
        location: String,
        description: String,
        username: String,
        comments:[{
                 type: mongoose.Schema.Types.ObjectId,
                 ref:"comments"
                 }]
});
module.exports=mongoose.model("journeys",journeySchema);
