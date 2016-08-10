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

weatherlyApp.yummlyApiKey = '20df0e101bb5ef2c9bf247ae44f5b670';
weatherlyApp.yummlyApiID = 'abcc327c';
weatherlyApp.yummlyApiUrl = 'http://api.yummly.com/v1/api/recipes';


//Get weather data
weatherlyApp.getWeather = function(city, country) {
	$.ajax({
		url: weatherlyApp.wundergroundApiUrl + weatherlyApp.wundergroundApiKey + "/geolookup/conditions/q/" + country + "/" + city + ".json",
		method: 'GET',
		dataType: 'jsonp'

	}).then(function(weatherStats) {
		console.log(weatherStats);
		var temp = weatherStats.current_observation.temp_c;
		// console.log(temp);
		var weather = weatherStats.current_observation.weather;
		// console.log(weather)
		$('.weatherDisplay').html('Your weather is ' + temp + weather);

		weatherlyApp.getTemp(temp, weather);
	});
};

weatherlyApp.getTemp = function(temp, weather) {
	console.log(temp, weather);//what is the temp - here

	if(temp > 25){
		weatherlyApp.tempName = "cold";
	} else if (temp < 10){
		weatherlyApp.tempName = "hot";
	} else {
		weatherlyApp.tempName = "";
	}

	weatherlyApp.getHealthy();
};

weatherlyApp.getHealthy = function() {

	if(weatherlyApp.healthy === 'yes'){
		weatherlyApp.healthyName = "healthy";
	} else {
		weatherlyApp.healthyName = "";
	}

	weatherlyApp.getDrinks(weatherlyApp.healthyName, weatherlyApp.tempName);
};

weatherlyApp.getDrinks = function(query1, query2) {
	$.ajax({
		url: weatherlyApp.yummlyApiUrl,
		method: 'GET',
		dataType: 'jsonp',
		data: {
			_app_key: weatherlyApp.yummlyApiKey,
			_app_id: weatherlyApp.yummlyApiID,
			requirePictures: true,
			allowedCourse: 'course^course-Beverages',
			maxResult: 3,
			q: query1 + " " + query2
		}
	}).then(function(drinksResults) {
		console.log(drinksResults);
	});
};


weatherlyApp.init = function() {
	$('form').on('submit', function(e) {

		e.preventDefault();

		var city = $('input[name=city]').val();
		var country = $('input[name=country]').val();

		weatherlyApp.healthy = $('input[name=healthy]:checked').val(); //this finds out whether they want to be healthy or not

		weatherlyApp.getWeather(city,country)

	});
};

$(function() {
	weatherlyApp.init();
});