const LOGIN = 'LOGIN'
const REGISTER = 'SET_USER'
const initialState = {
	user: {		
		userToken: '',
	}
}

export default function reducer(state=initialState, action) {
	switch (action.type) {
		case LOGIN: {
			return state;
		}
		case REGISTER: {
			return state;
		}
		default: {
			return state;
		}
		
	}
}