class ErrorMessage {
	_parentElement = document.querySelector('.error-message');

	render(message) {
		this._clear();
		const html = this._generateHTML(message);
		this._parentElement.insertAdjacentHTML('beforeend', html);
		this._addEvent(this._parentElement.querySelector('a'));
		this._showErrorMessage();
	}

	_clear() {
		this._parentElement.innerHTML = '';
	}

	_generateHTML(message) {
		return `
        <p>ERROR: ${message}</p>
        <a>OK</a>`;
	}

	_addEvent(el) {
		el.addEventListener('click', () => {
			this._hideErrorMessage();
		});
	}

	_showErrorMessage() {
		this._parentElement.classList.remove('hidden');
	}

	_hideErrorMessage() {
		this._parentElement.classList.add('hidden');
	}
}

export default new ErrorMessage();
