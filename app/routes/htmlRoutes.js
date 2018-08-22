// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require('path');

module.exports = function (app,express) {

	app.use('/assets', express.static(path.join(__dirname, '../assets')))

	app.get('/survey', function(req, res) {
		res.sendFile(path.join(__dirname + '/../public/survey.html'))
	});
	// sends user to homepage
	app.use('/', function(req, res) {
		console.log('home');
		res.sendFile(path.join(__dirname + '/../public/home.html'))
	});

}
