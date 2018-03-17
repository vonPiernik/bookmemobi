import axios from 'axios';

export default function logInUser(userData) {
	return dispatch => {
		let data = JSON.stringify(userData);
		axios.post('https://bookmemobi.azurewebsites.net/api/accounts/signin', data, {
			headers: {
				'Content-Type': 'application/json',
			}
		})
		.then(function (response) {
			console.log(response);
			dispatch({
				type: "LOGIN",
				payload: response.data
			})
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}

export function registerUser(userData) {
	return dispatch => {
		let data = JSON.stringify(userData);
		axios.post('https://bookmemobi.azurewebsites.net/api/accounts', data, {
			headers: {
				'Content-Type': 'application/json',
			}
		})
		.then(function (response) {
			console.log(response);
			dispatch({
				type: "REGISTER",
				payload: response.data
			})
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}