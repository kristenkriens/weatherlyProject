// Have user put in current location
// Compare user location to locations on Wunderground
// Retrieve and store weather data and temperature
// Add temperature and weather data + icons to the page
	// Snowy, Rainy, Sunny, Cloudy, Stormy
// Get all drinks from Yummly API
// Ask user if they want a healthy drink (use beverage endpoint)
	// If yes, SUGAR < 5, NA < 5, ENERC-KCAL < 5, VIT C > 5
	// else
// Compare temperature data to yummly keywords
	// If temp > 24 -- use "cold" keyword
	// else if < 10 -- use "hot" keyword
	// else (10-23) -- use "cold" and "hot"
// Randomly display 3 drinks with recipe and prep time


var weatherlyApp = {};

weatherlyApp.apiKey = '3b02180019cd1414';
weatherlyApp.apiUrl = 'http://api.wunderground.com/api/';

weatherlyApp.getWeather = function(country, city) {
	$.ajax({
		url: weatherlyApp.apiUrl + weatherlyApp.apiKey + "/geolookup/conditions/q/" + country + "/" + city + ".json",
		method: 'GET',
		dataType: 'jsonp'
	}).then(function(weatherStats){
		weatherlyApp.getBeverages(weatherStats);
	});
};

// weatherlyApp.getWeather = function() {
// 	$.ajax({
// 	  	url : "http://api.wunderground.com/api/3b02180019cd1414/geolookup/conditions/q/canada/Toronto.json",
// 	  	dataType : "jsonp",
// 	  	data: {

// 	  	}
// 	 }).then(function(parsed_json) {
//   		var location = parsed_json.location.city;
//   		var temp_c = parsed_json.current_observation.temp_c;
//   		var conditions = parsed_json.current_observation.icon;
//   		console.log(parsed_json);
// 	  	$('#weather').html('Current temperature in <span>' + location + '</span> is <span>'  + temp_c + 'C</span>), and the conditions are <span>' + conditions) + '</span>';
// 	  	// weatherlyApp.getBeverages(temp_c)
// 	  });
// };

// console.log(weatherlyApp.getWeather());


weatherlyApp.init = function(){

	$('#searchLocation').on('submit', function(e) {
		e.preventDefault();
		var country = $('input[name=country]').val();
		var city = $('input[name=city]').val();
		console.log(country, city)
		weatherlyApp.getWeather(country, city)
		$('input[name=country]').val('');
		$('input[name=city]').val('');
	});
};

$(function() {
	weatherlyApp.init();
});