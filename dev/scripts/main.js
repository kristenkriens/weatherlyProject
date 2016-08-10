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

weatherlyApp.apiKey = '7489dbf2bba52dd6';
weatherlyApp.apiUrl = 'http://api.wunderground.com/api/';

weatherlyApp.getWeather = function(country, city) {
	$.ajax({
		url: weatherlyApp.apiUrl + weatherlyApp.apiKey + "/geolookup/conditions/q/" + country + "/" + city + ".json",
		method: 'GET',
		dataType: 'jsonp'
	}).then(function(weatherStats){
		console.log(weatherStats);
		var temp = weatherStats.current_observation.temp_c;
		// console.log(temp);
		var weather = weatherStats.current_observation.weather;
		// console.log(weather)
		weatherlyApp.getBeverages(temp, weather);
	});
};
weatherlyApp.getBeverages = function(temp, weather){
	
	console.log(temp, weather)//what is the temp - here

	if(temp > 25){
		console.log('look for cold')
	} else if (temp < 10){
		console.log('look for hot')
	} else {
		console.log('look for any')
	}
}


weatherlyApp.init = function(){

	$('#searchForm').on('submit', function(e) {
	
		e.preventDefault();
		var country = $('input[name=country]').val();
		var city = $('input[name=city]').val();
		console.log(country, city)
		weatherlyApp.getWeather(country, city)
		
		var healthy = $('select#healthy option:selected').val(); //this finds out whether they want to be healthy or not
		console.log(healthy)

		if(healthy === 'yes'){
			//look for calories lower than....
		} else{
			//look for calories higher than...
		}

	});
};

$(function() {
	weatherlyApp.init();
});