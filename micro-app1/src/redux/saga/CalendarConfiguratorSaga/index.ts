import {
    getAssetDetailsByIdService,
    getDayConfigByAssetIdService,
    getShiftConfigByAssetIdService,
    getTimeZonesListService,
    setAssetsDetailsService,
    setDayConfigDetailsService,
    getMonthsListService,
    getWeekDaysListService,
    setShiftConfigDetailsService,
} from 'redux/services/CalendarConfiguratorServices/calendarConfiguratorService';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../../types/calendarConfiguratorTypes';
export function* getTimeZonesListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getTimeZonesListData = yield call(getTimeZonesListService);
        yield put({
            type: types.GET_TIMEZONE_LIST_SUCCESS,
            response: getTimeZonesListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_TIMEZONE_LIST_FAILURE });
    }
}

export function* setDayConfigDetailsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const setDayConfigDetailsData = yield call(
            setDayConfigDetailsService,
            payload
        );
        yield put({
            type: types.SET_DAY_CONFIG_DETAILS_SUCCESS,
            response: setDayConfigDetailsData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.SET_DAY_CONFIG_DETAILS_FAILURE });
    }
}

export function* setShiftConfigDetailsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const setShiftConfigDetailsData = yield call(
            setShiftConfigDetailsService,
            payload
        );
        yield put({
            type: types.SET_SHIFT_CONFIG_DETAILS_SUCCESS,
            response: setShiftConfigDetailsData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.SET_SHIFT_CONFIG_DETAILS_FAILURE });
    }
}

export function* setAssetDetailsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const setAssetDetailsData = yield call(
            setAssetsDetailsService,
            payload
        );
        yield put({
            type: types.SET_ASSET_DETAILS_SUCCESS,
            response: setAssetDetailsData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.SET_ASSET_DETAILS_FAILURE });
    }
}

export function* getDayConfigByAssetIdSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: 'SET_LOADING_DAY', payload: true });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getDayConfigData = yield call(
            getDayConfigByAssetIdService,
            payload
        );
        yield put({
            type: types.GET_DAY_CONFIG_BY_ASSET_ID_SUCCESS,
            response: getDayConfigData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_DAY_CONFIG_BY_ASSET_ID_FAILURE });
    }
    finally {
        yield put({ type: 'SET_LOADING_DAY', payload: false });
      }
}

export function* getShiftConfigByAssetIdSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: 'SET_LOADING_SHIFT', payload: true });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getShiftConfigData = yield call(
            getShiftConfigByAssetIdService,
            payload
        );
        yield put({
            type: types.GET_SHIFT_CONFIG_BY_ASSET_ID_SUCCESS,
            response: getShiftConfigData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_SHIFT_CONFIG_BY_ASSET_ID_FAILURE });
    }
    finally {
        yield put({ type: 'SET_LOADING_SHIFT', payload: false });
      }
}

export function* getAssetDetailsByIdSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getAssetData = yield call(getAssetDetailsByIdService, payload);
        yield put({
            type: types.GET_ASSET_DETAILS_BY_ID_SUCCESS,
            response: getAssetData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_ASSET_DETAILS_BY_ID_FAILURE });
    }
}

export function* getMonthsListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getMonthsData = yield call(getMonthsListService);
        yield put({
            type: types.GET_MONTHS_LIST_SUCCESS,
            response: getMonthsData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_MONTHS_LIST_FAILURE });
    }
}

export function* getWeekDaysSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getWeekDaysData = yield call(getWeekDaysListService);
        yield put({
            type: types.GET_WEEK_DAYS_LIST_SUCCESS,
            response: getWeekDaysData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_WEEK_DAYS_LIST_FAILURE });
    }
}

export function* calendarConfiguratorSaga(): any {
    yield all([takeLatest(types.GET_TIMEZONE_LIST, getTimeZonesListSaga)]);
    yield all([
        takeLatest(types.SET_DAY_CONFIG_DETAILS, setDayConfigDetailsSaga),
    ]);
    yield all([
        takeLatest(types.SET_SHIFT_CONFIG_DETAILS, setShiftConfigDetailsSaga),
    ]);
    yield all([takeLatest(types.SET_ASSET_DETAILS, setAssetDetailsSaga)]);
    yield all([
        takeLatest(types.GET_DAY_CONFIG_BY_ASSET_ID, getDayConfigByAssetIdSaga),
    ]);
    yield all([
        takeLatest(
            types.GET_SHIFT_CONFIG_BY_ASSET_ID,
            getShiftConfigByAssetIdSaga
        ),
    ]);
    yield all([
        takeLatest(types.GET_ASSET_DETAILS_BY_ID, getAssetDetailsByIdSaga),
    ]);
    yield all([takeLatest(types.GET_MONTHS_LIST, getMonthsListSaga)]);
    yield all([takeLatest(types.GET_WEEK_DAYS_LIST, getWeekDaysSaga)]);
}
