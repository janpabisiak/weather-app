class HistoryView {
	_parentElement = document.querySelector('.section-history');

	_clear() {
		this._parentElement.querySelector('.history-locations').innerHTML = '';
	}

	render(data) {
		this.hideHistorySection();
		this._clear();

		for (const city of data) {
			const html = `
            <div id="historyItemEl" class="history-item">
                <h3 id="historyItemTitleEl" style="font-weight: 500;">${city}</h3>
                <a id="historyItemSearchEl" class="toTranslate" href="#">Search</a>
            </div>
            `;
			this._parentElement.querySelector('.history-locations').insertAdjacentHTML('beforeend', html);
		}

		this._showHistorySection();
	}

	hideHistorySection() {
		this._parentElement.classList.add('hidden');
	}

	_showHistorySection() {
		this._parentElement.classList.remove('hidden');
	}

	addEventSearchHistory(handler) {
		this._parentElement.addEventListener('click', (e) => {
			handler(e.target);
		});
	}

	addEventClearHistory(handler) {
		this._parentElement.querySelector('.clear-history').addEventListener('click', () => {
			handler();
		});
	}
}

export default new HistoryView();
