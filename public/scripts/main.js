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

weatherlyApp.wundergroundApiKey = '7489dbf2bba52dd6';
weatherlyApp.wundergroundApiUrl = 'http://api.wunderground.com/api/';


//Get weather data
weatherlyApp.getWeather = function(city, country) {
	$.ajax({
		url: weatherlyApp.wundergroundApiUrl + weatherlyApp.wundergroundApiKey + "/geolookup/conditions/q/" + country + "/" + city + ".json",
		method: 'GET',
		dataType: 'jsonp'
	}).then(function(weatherStats) {
		weatherlyApp.displayWeather(weatherStats);
	});
};

// Display weather data
weatherlyApp.displayWeather = function(weatherStats) {
	$(".weatherDisplay").empty();

	var location = $('<h2>').text(weatherStats.location.city);
	var temperature = $('<h3>').text(weatherStats.current_observation.temp_c);
	var conditions = $('<h3>').text(weatherStats.current_observation.icon);
	
	$('.weatherDisplay').append(location, temperature, conditions);
};




weatherlyApp.init = function() {
	$('form').on('submit', function(e) {
		e.preventDefault();

		var city = $('input[name=city]').val();
		var country = $('input[name=country]').val();

		$('input[name=city]').val('');
		$('input[name=country]').val('');

		console.log(city, country)
		weatherlyApp.getWeather(city, country)
	});
};

$(function() {
	weatherlyApp.init();
});