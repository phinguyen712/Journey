 var mongoose                = require("mongoose");
 
 var journeySchema= new mongoose.Schema({
                userName:String,
                journeyName:String,
                caption:String,
                dourneyDate:String,
                images:[String],
                comments:[{
                        type: mongoose.Schema.Types.ObjectId,
                        ref:"comments"
                }],
                days:[{
                        dayIndex:String,
                        journeySchedule:[String]
                }]
});
module.exports=mongoose.model("journeys",journeySchema);
