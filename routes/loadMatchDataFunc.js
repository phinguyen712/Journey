var    Yelp                    =   require("yelp");

var yelp = new Yelp({
  consumer_key: 'LDo2SW89ugeWVJQXDLIqkg',
  consumer_secret: "kgpjgGAUj5c5_GUwvlWt-g21WzM",
  token: 'A-qbWCmj7u_pxx2dKZPox11rOdkp8kBf',
  token_secret: '95n7Fr_0Mdje8F_XbzKQ5qAhZ28',
});

//function for searching up yelp's businesses based on users's propoerties e.g
// schedule/favorite/ToDo
  function loadMatchData(matchArr,userProperties,exportFunction){
     
    

     //Array for storing all search results from yelp
     var retrievedYelpData = [];
     
     //clear array
     matchArr.length = 0;
    
    //Array of non-repeating elements, eliminate repeated yelp search     
     var uniqueProperties = userProperties.filter(function(elem, index, self){
            return index == self.indexOf(elem);
        });
    
    //set matchArr[] to lenght of userProperties
     matchArr = Array.apply(null, Array(userProperties.length)).map(function(){});
   
    // API data request from yelp based on uniqueProperties
    //counter for initiating next step when async request is complete
     var counter = 0;
     //search up all businesses in the unqiue Properties object         
       for(var x = 0 ; x < uniqueProperties.length ; x++){
            yelp.business(uniqueProperties[x]).then(function(yelpId){
                retrievedYelpData.push(yelpId);
                counter ++;
           
           if(counter == uniqueProperties.length){
      
            var yelpIndex  =  retrievedYelpData.map(function(dataId){
                return dataId.id;
            });
        
        for(var z = 0 ; z < userProperties.length ; z++){
                    
            
            var index = yelpIndex.indexOf(userProperties[z]);
         
                    
                   matchArr.splice(z , 1 , retrievedYelpData[index]);
           
                }
                exportFunction(matchArr);
              // matchArr.forEach(function(hey){
              // console.log(hey.id);
              // });
               
           }
           });
       }
     exportFunction(matchArr);
    }   
    
module.exports.loadMatchData=loadMatchData;    
    