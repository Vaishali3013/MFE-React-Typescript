import { all, call, put, takeLatest } from 'redux-saga/effects';
import { data } from 'json/sideNav';
import { message } from 'antd';
import {
    GET_ALLOWED_MENU_LIST,
    GET_ALLOWED_MENU_LIST_SUCCESS,
    GET_SIDENAV_MENU_LIST,
    GET_SIDENAV_MENU_LIST_SUCCESS,
} from 'redux/types/sideNavTypes';
import { getAllowedMenuListsServices } from 'redux/services/SideNavServices';

export function* getSidenavMenuListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({
            type: GET_SIDENAV_MENU_LIST_SUCCESS,
            payload: data,
        });
    } catch (error: any) {
        return message.error('error');
    }
}

export function* getAllowedMenuListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const usersDataList = yield call(getAllowedMenuListsServices, payload);
        yield put({
            type: GET_ALLOWED_MENU_LIST_SUCCESS,
            response: usersDataList,
        });
    } catch (error: any) {
        return message.error(error.response);
    }
}

export function* sideNavSaga(): any {
    yield all([takeLatest(GET_SIDENAV_MENU_LIST, getSidenavMenuListSaga)]);
    yield all([takeLatest(GET_ALLOWED_MENU_LIST, getAllowedMenuListSaga)]);
}
