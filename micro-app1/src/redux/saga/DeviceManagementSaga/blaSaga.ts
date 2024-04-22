import {
    editBlaServices,
    createBlaService,
    getAllBlasListService,
    getBlaByIdService,
    getBlasListService,
    activateDeactivateBlasService,
    getDevicesInBlaListService,
    removeDeviceInBla,
} from 'redux/services/DeviceManagementServices/blaService';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../../types/deviceManagementTypes';
import { message } from 'antd';

export function* editBlaSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const editBlaData = yield call(editBlaServices, payload);
        yield put({
            type: types.EDIT_BLA_SUCCESS,
            response: editBlaData,
        });
    } catch (error: any) { }
}

export function* getBlasListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getBlasListData = yield call(getBlasListService, payload);
        yield put({
            type: types.GET_BLAS_LIST_SUCCESS,
            response: getBlasListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_BLAS_LIST_FAILURE });
    }
}

export function* getAllBlasListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getAllBlasListData = yield call(getAllBlasListService, payload);
        yield put({
            type: types.GET_ALL_BLAS_LIST_SUCCESS,
            response: getAllBlasListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_ALL_BLAS_LIST_FAILURE });
    }
}

export function* getBlaDetailsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const getBlaDetails = yield call(getBlaByIdService, payload);
        yield put({
            type: types.GET_BLA_DETAILS_SUCCESS,
            response: getBlaDetails,
        });
    } catch (error: any) { }
}

export function* activateDeactivateBlasSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const activateDeactivateBlasData = yield call(
            activateDeactivateBlasService,
            payload
        );
        yield put({
            type: types.ACTIVATE_DEACTIVATE_BLAS_SUCCESS,
            response: activateDeactivateBlasData,
        });
    } catch (error: any) { }
}

export function* createBlaSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const blaDetails = yield call(createBlaService, payload);
        message.info('BLA created Successfully');
        yield put({
            type: types.SET_BLA_LIST_SUCCESS,
            response: { blaDetails, ...payload },
        });
    } catch (error: any) { }
}

export function* getDeviceInBlaListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getDevicesInBlaListData = yield call(
            getDevicesInBlaListService,
            payload
        );
        yield put({
            type: types.GET_DEVICES_BLA_LIST_SUCCESS,
            response: getDevicesInBlaListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_DEVICES_BLA_LIST_FAILURE });
    }
}

export function* removeDeviceInBlaSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const removeDeviceInBlaData = yield call(removeDeviceInBla, payload);
        yield put({
            type: types.REMOVE_DEVICE_BLA_SUCCESS,
            response: removeDeviceInBlaData,
        });
    } catch (error: any) { }
}

export function* blaSaga(): any {
    yield all([takeLatest(types.GET_BLAS_LIST, getBlasListSaga)]);
    yield all([takeLatest(types.GET_ALL_BLAS_LIST, getAllBlasListSaga)]);
    yield all([takeLatest(types.GET_BLA_DETAILS, getBlaDetailsSaga)]);
    yield all([
        takeLatest(types.ACTIVATE_DEACTIVATE_BLAS, activateDeactivateBlasSaga),
    ]);
    yield all([takeLatest(types.SET_BLA_LIST, createBlaSaga)]);
    yield all([takeLatest(types.EDIT_BLA, editBlaSaga)]);
    yield all([takeLatest(types.GET_DEVICES_BLA_LIST, getDeviceInBlaListSaga)]);
    yield all([takeLatest(types.REMOVE_DEVICE_BLA, removeDeviceInBlaSaga)]);
}
