var friendsData = require ('../data/friends.js');

module.exports = function (app) {
	app.get('/api/friends', function(req, res) {
		res.json(friendsData);
	});


	app.post('/api/friends', function(req, res){
		// Get survey inputs from api request, converting input to integers
		const surveryResults = req.body.scores.map(x => parseInt(x));
		var result = {
			name: 'Default name',
			photo: 'Default URL'
		};

		// console.log(friendsData);

		// Loop over possible matches to calculate score difference
		for (let f=0;f<friendsData.length;f++) {
			var deltas = [];
			var difference = 0;
			var totalDiff = 0;

			console.log(surveryResults,'surveryResults');
			console.log(friendsData[f].scores,friendsData[f].name);

			for (let s=0;s<friendsData[f].scores.length;s++) {
				difference = friendsData[f].scores[s] - surveryResults[s];
				difference = Math.abs(difference);
				deltas.push(difference);
			}

			totalDiff = deltas.reduce(function(acc, val) { return acc + val; });
			
			console.log(deltas,'Deltas');
			console.log('Difference for ' + friendsData[f].name + ' is:',totalDiff);

			friendsData[f].difference = totalDiff;
		}

		// console.log(friendsData);

		
		var lowestDiff = 9999; 
		var chosenFriend = -1; 

		console.log('-------------- Looking for closest match')
		for (let f=0;f<friendsData.length;f++) {
			if (friendsData[f].difference < lowestDiff) {
				console.log('Found a lower match!',friendsData[f].name)
				lowestDiff = friendsData[f].difference;
				chosenFriend = f;
			} else {
				console.log('NO match!',friendsData[f].name, friendsData[f].difference, lowestDiff)
			}
		}

		// Return closest match
		res.json(friendsData[chosenFriend]);
	});

}
