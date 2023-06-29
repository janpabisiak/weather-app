'use strict';

import * as model from './model';
import searchBoxView from './views/searchBoxView';
import errorMessageView from './views/errorMessageView';
import historyView from './views/historyView';
import nowView from './views/nowView';
import nowBadgesView from './views/nowBadgesView';
import nextHoursView from './views/nextHoursView';
import nextDaysView from './views/nextDaysView';
import miscView from './views/miscView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlFetchData = async function (target) {
	try {
		model.prepareWeekDays();

		if (target.classList.contains('submit')) {
			const cityName = searchBoxView.getQuery();
			if (!cityName) return;
			await model.getCoordsByCity(cityName);
		} else if (target.closest('div').classList.contains('localize-div')) {
			await model.readGeolocationAPI();
		} else if (target.tagName === 'A') {
			await model.getCoordsByCity(target.previousSibling.previousSibling.textContent);
		} else {
			return;
		}

		miscView.showSpinner();

		await model.fetchTodayWeather(model.state.location.coords[0], model.state.location.coords[1]);
		await model.fetchNextDaysWeather(model.state.location.coords[0], model.state.location.coords[1]);
		await model.fetchLocationData(model.state.location.coords[0], model.state.location.coords[1]);

		model.saveLocation(model.state.location.city);
		controlHistory();
		controlRenderData();
	} catch (error) {
		errorMessageView.render(error);
	}
};

const controlRenderData = async function () {
	try {
		nowView.render(model.state);
		nowBadgesView.render(model.state);
		nextHoursView.render(model.state);
		nextDaysView.render(model.state);

		miscView.hideSpinner();
		miscView.changeVisibility('ready');
	} catch (error) {
		errorMessageView.render(error);
	}
};

const controlHistory = function () {
	try {
		model.loadLocations();
		if (model.state.previousLocations.length) {
			historyView.render(model.state.previousLocations);
		} else {
			historyView.hideHistorySection();
		}
	} catch (error) {
		errorMessageView.render(error);
	}
};

const controlDeleteHistory = function () {
	localStorage.clear();
	controlHistory();
};

const init = function () {
	controlHistory();
	searchBoxView.addHandlerSearch(controlFetchData);
	historyView.addEventSearchHistory(controlFetchData);
	historyView.addEventClearHistory(controlDeleteHistory);
	miscView.addEventHandlerBackButton();
};
init();
