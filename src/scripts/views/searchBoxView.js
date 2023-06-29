class SearchBoxView {
	_parentElement = document.querySelector('.search-box');

	getQuery() {
		return this._parentElement.querySelector('.search').value;
	}

	clearInput() {
		this._parentElement.querySelector('.search').value = '';
	}

	addHandlerSearch(handler) {
		this._parentElement.addEventListener('click', (e) => {
			handler(e.target);
		});

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				handler(this._parentElement.querySelector('.submit'));
			}
		});
	}
}

export default new SearchBoxView();
