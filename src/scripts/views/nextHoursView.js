import View from './View';

class NextHoursView extends View {
	_parentElement = document.querySelector('.weather-today-hours');

	async render(data) {
		this._clear();
		const html = await this._generateHTML(data);
		this._parentElement.insertAdjacentHTML('beforeend', html);

		this._parentElement.addEventListener('wheel', (e) => {
			if (e.deltaY > 0) {
				this._parentElement.scrollBy(20, 0);
			}
			if (e.deltaY < 0) {
				this._parentElement.scrollBy(-20, 0);
			}
		});
	}

	_clear() {
		this._parentElement.innerHTML = '';
	}

	async _generateHTML(data) {
		let html = '';
		for (let i = Number(data.currentHour) + 1; i <= 23; i++) {
			html += `
            <div class='weather-hour-item'>
			<p class='weather-hour-time'>${i}:00</p>
			<div class='weather-hour-icon'>${await this._getWeatherIcon(data.todayWeather.weatherCode[i])}</div>
			<h3 class='weather-hour-temperature'>${data.todayWeather.temperature[i]}°C</h3>
			</div>`;
		}
		return html;
	}
}

export default new NextHoursView();
