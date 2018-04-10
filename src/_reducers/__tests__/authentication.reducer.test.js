import { authentication } from '../authentication.reducer.js';
import {userConstants} from '../../_constants/user.constants';

const sampleUser = {
    "id": "string",
    "userName": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "token": "string"
}

describe('authentication reducer tests', () => {

    it('has default state', () => {
        expect(authentication(undefined, {type: 'unexpected'}))
        .toEqual({});
    })
    
    it('sets loggingIn flag', () => {
        expect(authentication(undefined, {
            type: userConstants.LOGIN_REQUEST,
            user: sampleUser
        }))
        .toEqual({
            loggingIn: true,
            user: sampleUser
          });
    })

});