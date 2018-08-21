var friendsData = require("..data/friends");
var path = require("path");

var totalDiff = 0;

module.exports = function (app) {
  app.get("api/friends", function (req, res) {
    res.json(friendsData);
  });


  //  * A POST routes`/api/friends`.This will be used to handle incoming survey results.This route will also be used to handle the compatibility logic. 
  app.post("/data/friends", function (req, res) {
    var friendMatch = {
      name: "",
      photo: "",
      friendDiff: 1000,
    };

    var userData = req.body;
    var userName = userData.name;
    var userPhoto = userData.photo;
    var userScores = userData.scores;
    var totalDiff = 0;

    //loop through the friends data array of objects to get each friends scores
    for (var i = 0; i < friendsData.length - 1; i++) {
      totalDiff = 0;
      //loop through that friends score and the users score and calculate the 
      // absolute difference between the two and push that to the total difference variable set above
      for (var j = 0; j < 10; j++) {
        // We calculate the difference between the scores and sum them into the totalDifference
        totalDiff += Math.abs(parseInt(userScores[j]) - parseInt(friendsData[i].scores[j]));
        // If the sum of differences is less then the differences of the current "best match"
        if (totalDiff <= friendMatch.friendDiff) {
          // Reset the friendMatch to be the new friend. 
          friendMatch.name = friendsdata[i].name;
          friendMatch.photo = friendsdata[i].photo;
          friendMatch.matchDiff = totalDiff;
        }
      }
    }

    friendsdata.push(userData);

    res.json(friendMatch);
  });

};

