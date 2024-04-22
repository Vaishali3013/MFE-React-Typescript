import {
    GET_ALLOWED_MENU_LIST,
    GET_SIDENAV_MENU_LIST,
} from 'redux/types/sideNavTypes';

export const getSidenavMenuList = (): any => ({
    type: GET_SIDENAV_MENU_LIST,
});
export const getAllowedMenuList = (payload: any): any => ({
    type: GET_ALLOWED_MENU_LIST,
    payload: payload,
});
