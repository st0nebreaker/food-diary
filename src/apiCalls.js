import { apiKey, apiID } from "./.apiKey";

const rootUrl = 'https://trackapi.nutritionix.com/v2';

export const fetchSearch = async (givenValue) => {
	const response = await fetch(`${rootUrl}/search/instant?query=${givenValue}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'x-user-jwt': 0,
			'x-app-id': apiID,
			'x-app-key': apiKey,
		}
	});

	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		throw new Error(response.statusText);
	}
}

export const fetchFood = async (givenName) => {
	const response = await fetch(`${rootUrl}/natural/nutrients`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-user-jwt': 0,
			'x-app-id': apiID,
			'x-app-key': apiKey,
		},
		body: JSON.stringify({
			"query": givenName,
			"timezone": "US/Eastern",
		})
	});

	if (response.ok) {
		const data = await response.json();
		return data.foods[0];
	} else {
		throw new Error(response.statusText);
	}
}