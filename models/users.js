var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var usersSchema= new mongoose.Schema({
        username: String,
        password: String,
        favorites: [String],
        liked:[String],
        currentJourney: { id: String,
                        name: String
        },
        journeys:[{ type: mongoose.Schema.Types.ObjectId,
                        ref:"journeys"
        }]
});

usersSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",usersSchema);
