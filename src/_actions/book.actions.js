import { bookConstants } from '../_constants';
// import { userService } from '../_services';
// import { alertActions } from './';
import { history } from '../_helpers';

export const bookActions = {
    showSidebar,
    hideSidebar
    // delete: _delete
};

function showSidebar() {
    return {
        type: bookConstants.SHOW_SIDEBAR
    }
}

function hideSidebar() {
    return {
        type: bookConstants.HIDE_SIDEBAR
    }
}
