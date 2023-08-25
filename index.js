var countriesOld = require('./countries.json').countries;
var countries = require('./countries-custom.json').countries;
var statesOld = require('./states.json').states;
var states = require('./states-custom.json').states;
var citiesOld = require('./cities.json').cities;
var cities = require('./cities-custom.json').cities;
var alasql = require("alasql");

module.exports = {

	// Countries API
	getAllCountries: function() {
		return countries;
	},

	searchCountry: function(countryName) {
		let searchCountryQuery = 'SELECT * FROM ? WHERE name LIKE "'+countryName+'%"';
		let countryList = alasql(searchCountryQuery, [countries]);
		return countryList;
	},

	searchCountryByCountryCode: function(countryCode) {
		let countryCodeText = countryCode.toUpperCase();
		let searchCountryQuery = 'SELECT * FROM ? WHERE iso2="'+countryCodeText+'"';
		let countryList = alasql(searchCountryQuery, [countries]);
		return countryList;
	},

	// States API
	getAllStatesFromCountry: function(countryName) {
		let stateCountryJoinQuery = 'SELECT * FROM ? WHERE LOWER(country_name) LIKE LOWER("'+countryName+'")';
		let stateCountryJoinList = alasql(stateCountryJoinQuery, [states]);
		return stateCountryJoinList;
	},

	getStatesByCountryId: function(country_id) {
		let stateQuery = 'SELECT * FROM ? WHERE country_id="'+country_id+'"';
		let stateQueryList = alasql(stateQuery, [states]);
		return stateQueryList;
	},

	searchState: function(searchTextState) {
		let searchStateQuery = 'SELECT * FROM ? as state WHERE name LIKE "'+searchTextState+'%"';
		let statesList = alasql(searchStateQuery, [states]);
		return statesList;
	},
	
	// Cities API
	getAllCitiesFromState: function(stateName) {
		let cityStateJoinQuery = 'SELECT * FROM ? WHERE state_name="'+stateName+'"';
		let cityStateJoinList = alasql(cityStateJoinQuery, [cities]);
		return cityStateJoinList;
	},

	getAllCitiesByStateCode: function(stateCode) {
		let cityStateJoinQuery = 'SELECT * FROM ? WHERE state_code="'+stateCode+'"';
		let cityStateJoinList = alasql(cityStateJoinQuery, [cities]);
		return cityStateJoinList;
	},

	getAllCitiesByStateId: function(stateId) {
		let cityStateJoinQuery = 'SELECT * FROM ? WHERE state_id="'+stateId+'"';
		let cityStateJoinList = alasql(cityStateJoinQuery, [cities]);
		return cityStateJoinList;
	},

	searchCity: function(searchTextCity) {
		let searchCityQuery = 'SELECT * FROM ? WHERE name LIKE "'+searchTextCity+'%"';
		let cityList = alasql(searchCityQuery, [cities]);
		return cityList;
	}

}
