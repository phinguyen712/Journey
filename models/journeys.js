 var mongoose                = require("mongoose");
 
 var journeySchema= new mongoose.Schema({
                userName:String,
                journeyName:String,
                caption:String,
                publishDate:Date,
                publish:Boolean,
                images:[String],
                likes:[{}],
                comments:[{
                        type: mongoose.Schema.Types.ObjectId,
                        ref:"comments"
                }],
                days:[{
                        journeySchedule:[String]
                }]
});
module.exports=mongoose.model("journeys",journeySchema);
