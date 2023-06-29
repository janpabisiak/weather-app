import { DEV_MODE } from './config';
import { getJSON } from './helpers';

const currentDate = new Date();

export const state = {
	currentHour: currentDate.getHours().toString().padStart(2, '0'),
	currentWeekDay: currentDate.getDay(),
	weekDays: ['Tomorrow'],
};

export const prepareWeekDays = function () {
	state.weekDays.splice(1);

	for (let i = 1; i <= 6; i++) {
		let weekDay = state.currentWeekDay + i;
		if (weekDay > 6) {
			weekDay -= 7;
		}
		state.weekDays.push(_getFullWeekdayName(weekDay));
	}
};

const _getFullWeekdayName = function (weekDay) {
	switch (weekDay) {
		case 0:
			return 'Monday';
		case 1:
			return 'Tuesday';
		case 2:
			return 'Wednesday';
		case 3:
			return 'Thursday';
		case 4:
			return 'Friday';
		case 5:
			return 'Saturday';
		case 6:
			return 'Sunday';
	}
};

export const fetchTodayWeather = async function (latitude, longitude) {
	try {
		const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,weathercode,precipitation_probability,surface_pressure,visibility,windspeed_10m&daily=weathercode,uv_index_max&forecast_days=1&timezone=auto`;

		// 1. GET TODAY WEATHER
		const data = await getJSON(WEATHER_API_URL);

		state.todayWeather = {
			UVIndex: data.daily.uv_index_max[0],
			precipitationProbability: data.hourly.precipitation_probability,
			relativeHumidity: data.hourly.relativehumidity_2m,
			pressure: data.hourly.surface_pressure,
			temperature: data.hourly.temperature_2m,
			visibility: data.hourly.visibility,
			weatherCode: data.hourly.weathercode,
			windSpeed: data.hourly.windspeed_10m,
		};
	} catch (error) {
		if (DEV_MODE) console.log(error.message);
		if (error.message === 'Request took too long!') throw error.message;
		throw new Error('Cannot find data for this city!').message;
	}
};

export const fetchNextDaysWeather = async function (latitude, longitude) {
	try {
		const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&forecast_days=8&timezone=auto`;

		const data = await getJSON(WEATHER_API_URL);
		state.nextDaysWeather = {
			weatherCode: [],
			avgTemperature: [],
		};

		for (let i = 1; i <= 7; i++) {
			state.nextDaysWeather.weatherCode.push(data.daily.weathercode[i]);
			state.nextDaysWeather.avgTemperature.push(
				((data.daily.temperature_2m_min[i] + data.daily.temperature_2m_max[i]) / 2).toFixed(1)
			);
		}
	} catch (error) {
		if (DEV_MODE) console.log(error.message);
		if (error.message === 'Request took too long!') throw error.message;
		throw new Error('Cannot find data for this city!').message;
	}
};

export const readGeolocationAPI = async function () {
	if (navigator.geolocation) {
		try {
			const position = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});

			const { latitude, longitude } = position.coords;
			await this.fetchLocationData(latitude, longitude);
		} catch (error) {
			if (DEV_MODE) console.log(error);
			if (error == 'Request took too long!') throw error;
			throw new Error('No permission to fetch user location.').message;
		}
	}
};

export const fetchLocationData = async function (latitude, longitude) {
	try {
		const GEO_API_URL = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`;

		const data = await getJSON(GEO_API_URL);

		let city = '';
		if (data.address.city) {
			city = data.address.city;
		} else if (data.address.town) {
			city = data.address.town;
		} else {
			city = data.address.village;
		}
		state.location = {
			city: city,
			country: data.address.country,
			coords: [latitude, longitude],
		};
	} catch (error) {
		if (DEV_MODE) console.error(error.message);
		if (error.message === 'Request took too long!') throw error.message;
		throw new Error('Cannot find data for this city!').message;
	}
};

export const getCoordsByCity = async function (city) {
	try {
		const GEO_API_URL = `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1&accept-language=en`;

		const data = await getJSON(GEO_API_URL);

		state.location = {
			city: city,
			coords: [data[0].lat, data[0].lon],
		};
	} catch (error) {
		if (DEV_MODE) console.error(error.message);
		if (error.message === 'Request took too long!') throw error.message;
		throw new Error('Cannot find data for this city!').message;
	}
};

export const loadLocations = function () {
	if (localStorage.previousLocations) {
		state.previousLocations = JSON.parse(localStorage.previousLocations);
	} else {
		localStorage.previousLocations = [];
		state.previousLocations = [];
	}
};

export const saveLocation = function (city) {
	if (!state.previousLocations.includes(city) && city.length > 0) {
		state.previousLocations.push(city);
	}
	localStorage.setItem('previousLocations', JSON.stringify(state.previousLocations));
};
