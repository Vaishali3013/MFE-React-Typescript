import {
    GET_ALLOWED_MENU_LIST_SUCCESS,
    GET_SIDENAV_MENU_LIST_SUCCESS,
} from 'redux/types/sideNavTypes';
import initialState from './initialStates';
import { SHOW_LOADER_SUCCESS } from 'redux/types/userManagementTypes';
import { UPLOAD_LOADER_STATE_HANDLER } from 'redux/types/deviceManagementTypes';

export default function sideNavReducer(
    state = initialState.root,
    action: any
): any {
    switch (action.type) {
        case GET_SIDENAV_MENU_LIST_SUCCESS:
            state = {
                ...state,
                sideNavMenuList: action.payload,
            };
            return state;
        case UPLOAD_LOADER_STATE_HANDLER:
            state = {
                ...state,
                bulkUploadLoader: action.bulkUploadLoader,
            };
            return state;
        case SHOW_LOADER_SUCCESS:
            return { ...state, showLoader: action.showLoader };
        case GET_ALLOWED_MENU_LIST_SUCCESS:
            return {
                ...state,
                allowedMenuList: action.response.data,
            };
        default:
            return state;
    }
}
