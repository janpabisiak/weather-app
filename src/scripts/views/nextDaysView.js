import View from './View';

class NextDaysView extends View {
	_parentElement = document.querySelector('.section-next');

	async render(data) {
		this._clear();
		const html = await this._generateHTML(data);
		this._parentElement.insertAdjacentHTML('beforeend', html);
	}

	_clear() {
		this._parentElement.innerHTML = '';
	}

	async _generateHTML(data) {
		let html = ``;
		for (let i = 0; i < data.weekDays.length; i++) {
			html += `
			<div class="section-next-item">
				<div class="next-item-date toTranslate">${data.weekDays[i]}</div>
				<div class="next-item-content">
					<div class="next-item-icon">${await this._getWeatherIcon(data.nextDaysWeather.weatherCode[i])}</div>
					<div class="next-item-temperature">${data.nextDaysWeather.avgTemperature[i]}°C</div>
				</div>
			</div>`;
		}
		return html;
	}
}

export default new NextDaysView();
