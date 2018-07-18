import { alertConstants } from '../_constants';

export const alertActions = {
    waiting,
    success,
    error,
    clear
};

function waiting(message) {
    return { type: alertConstants.WAITING, message };
}

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message, status) {
    return { type: alertConstants.ERROR, message, status };
}

function clear() {
    return { type: alertConstants.CLEAR };
}