const SET_USER = 'SET_USER'
const initialState = {
	user: {
		isLoggedIn: false,
	}
}

export default function reducer(state=initialState, action) {
	switch (action.type) {
		case SET_USER: {
			return state;
		}
		default: {
			return state;
		}
		
	}
}