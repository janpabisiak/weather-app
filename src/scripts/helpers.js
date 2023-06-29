import { TIMEOUT_SECONDS, DEV_MODE } from './config';

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long!`));
		}, s * 1000);
	});
};

export const getJSON = async function (url) {
	try {
		const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
		const data = await response.json();
		if (!response.ok) throw new Error(`${data.message} (${response.status})`);
		return data;
	} catch (error) {
		if (DEV_MODE) console.error(error.message);
		throw error;
	}
};
