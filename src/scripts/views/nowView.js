import View from './View';

class NowView extends View {
	weatherTodayNowEl = document.querySelector('.section-title');
	weatherNowIconEl = document.querySelector('.weather-today-icon-svg');
	weatherNowTemperatureEl = document.querySelector('.weather-today-temperature');
	weatherTodayLocalizationEl = document.querySelector('.weather-today-localization');

	async render(data) {
		const tempCurrentHour = data.currentHour.length === 1 ? Number(data.currentHour[1]) : Number(data.currentHour);

		this.weatherTodayNowEl.textContent = `${data.currentHour}:00`;
		this.weatherNowIconEl.innerHTML = await this._getWeatherIcon(data.todayWeather.weatherCode[tempCurrentHour]);
		this.weatherNowTemperatureEl.textContent = `${data.todayWeather.temperature[tempCurrentHour]}°C`;
		this.weatherTodayLocalizationEl.textContent = `${data.location.city}, ${data.location.country}`;
	}
}

export default new NowView();
