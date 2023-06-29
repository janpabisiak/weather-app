document.querySelector('.year').textContent = new Date().getFullYear();

class MiscView {
	searchBoxEl = document.querySelector('.search-box');
	changeLocalizationEl = document.querySelector('.btn');
	weatherBoxEl = document.querySelector('.weather-box');
	spinnerDivEl = document.querySelector('.loading-div');
	changeLocalizationEl = document.querySelector('.btn');

	changeVisibility(mode = null) {
		if (mode === 'ready') {
			this.searchBoxEl.classList.add('hidden');
			this.changeLocalizationEl.classList.remove('hidden');
			this.weatherBoxEl.classList.remove('hidden');
		} else {
			this.searchBoxEl.querySelector('.search').value = '';
			this.searchBoxEl.classList.remove('hidden');
			this.changeLocalizationEl.classList.add('hidden');
			this.weatherBoxEl.classList.add('hidden');
		}
	}

	showSpinner() {
		this.spinnerDivEl.classList.remove('hidden');
	}

	hideSpinner() {
		this.spinnerDivEl.classList.add('hidden');
	}

	addEventHandlerBackButton() {
		this.changeLocalizationEl.addEventListener('click', () => {
			this.changeVisibility('ongoing');
		});
	}
}

export default new MiscView();
