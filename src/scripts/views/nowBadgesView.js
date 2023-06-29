import View from './View';

class NowBadgesView extends View {
	humidityEl = document.querySelector('#humidity');
	windSpeedEl = document.querySelector('#windSpeed');
	pressureEl = document.querySelector('#pressure');
	visibilityEl = document.querySelector('#visibility');
	rainChanceEl = document.querySelector('#rainChance');
	UVIndexEl = document.querySelector('#UVIndex');

	async render(data) {
		const tempCurrentHour = data.currentHour.length === 1 ? Number(data.currentHour[1]) : Number(data.currentHour);

		this.humidityEl.textContent = `${data.todayWeather.relativeHumidity[tempCurrentHour]}%`;
		this.windSpeedEl.textContent = `${data.todayWeather.windSpeed[tempCurrentHour]}km/h`;
		this.pressureEl.textContent = `${data.todayWeather.pressure[tempCurrentHour]}hPa`;
		this.visibilityEl.textContent = `${data.todayWeather.visibility[tempCurrentHour]}m`;
		this.rainChanceEl.textContent = `${data.todayWeather.precipitationProbability[tempCurrentHour]}%`;

		if (data.todayWeather.UVIndex < 2) {
			this.UVIndexEl.textContent = 'Low';
			this.UVIndexEl.style.color = 'green';
		} else if (data.todayWeather.UVIndex < 6) {
			this.UVIndexEl.textContent = 'Moderate';
			this.UVIndexEl.style.color = 'orange';
		} else if (data.todayWeather.UVIndex < 8) {
			this.UVIndexEl.textContent = 'High';
			this.UVIndexEl.style.color = 'orange';
		} else if (data.todayWeather.UVIndex < 11) {
			this.UVIndexEl.textContent = 'Very high';
			this.UVIndexEl.style.color = 'red';
		} else {
			this.UVIndexEl.textContent = 'Extreme';
			this.UVIndexEl.style.color = 'purple';
		}
	}
}

export default new NowBadgesView();
