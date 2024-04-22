import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ADD_DEVICE,
    ADD_DEVICE_FAILURE,
    ADD_DEVICE_SUCCESS,
    GET_ALL_DEVICES_LIST_BY_BLA_ID_SUCCESS,
} from 'redux/actions/actionTypes';
import { addDeviceService } from 'redux/services/DeviceManagementServices/addDevice';

import * as types from '../../types/deviceManagementTypes';
import { message } from 'antd';
import {
    deviceStartService,
    deviceStopService,
    editDeviceServices,
    getAllDevicesListService,
    getDeviceByIdService,
    getDevicesListService,
    activateDeactivateDevicesService,
    cloneDevicesService,
} from 'redux/services/DeviceManagementServices/deviceService';
import { getDevicesInBlaListService } from 'redux/services/DeviceManagementServices/blaService';

export function* getDevicesListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getDevicesListData = yield call(getDevicesListService, payload);
        yield put({
            type: types.GET_DEVICE_LIST_SUCCESS,
            response: getDevicesListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_DEVICE_LIST_FAILURE });
    }
}

export function* getAllDevicesListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        let getAllDevicesListData;
        if (payload) {
            getAllDevicesListData = yield call(
                getAllDevicesListService,
                payload
            );

            yield put({
                type: GET_ALL_DEVICES_LIST_BY_BLA_ID_SUCCESS,
                response: getAllDevicesListData,
            });
        } else {
            getAllDevicesListData = yield call(
                getAllDevicesListService,
                payload
            );

            yield put({
                type: types.GET_ALL_DEVICES_LIST_SUCCESS,
                response: getAllDevicesListData,
            });
        }
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_ALL_DEVICES_LIST_FAILURE });
    }
}

export function* addDeviceSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const addedDevice = yield call(addDeviceService, payload);
        message.info('Device added successfully');
        yield put({
            type: ADD_DEVICE_SUCCESS,
            response: addedDevice,
        });
    } catch (error: any) {
        yield put({
            type: ADD_DEVICE_FAILURE,
        });
        return null;
    }
}
export function* getDeviceDetailsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getDeviceDetails = yield call(getDeviceByIdService, payload);
        yield put({
            type: types.GET_DEVICE_DETAILS_SUCCESS,
            response: getDeviceDetails,
        });
    } catch (error: any) {
    }
}

export function* editDeviceSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
      
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const editDeviceData = yield call(editDeviceServices, payload);
       
        yield put({
            type: types.EDIT_DEVICE_SUCCESS,
            response: editDeviceData,
        });
    } catch (error: any) {}
}

export function* deviceStartSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const deviceStart = yield call(deviceStartService, payload);
        yield put({
            type: types.SET_DEVICE_START_SUCCESS,
            response: deviceStart,
        });
    } catch (error: any) {
        yield put({
            type: types.SET_DEVICE_START_FAILURE,
        });
        return null;
    }
}

export function* deviceStopSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const deviceStop = yield call(deviceStopService, payload);
        yield put({
            type: types.SET_DEVICE_STOP_SUCCESS,
            response: deviceStop,
        });
    } catch (error: any) {
        yield put({
            type: types.SET_DEVICE_STOP_FAILURE,
        });
        return null;
    }
}

export function* activateDeactivateDevicesSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const activateDeactivateDevicesData = yield call(
            activateDeactivateDevicesService,
            payload
        );
        yield put({
            type: types.ACTIVATE_DEACTIVATE_DEVICES_SUCCESS,
            response: activateDeactivateDevicesData,
        });
    } catch (error: any) {}
}

export function* cloneDevicesSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const isClonedDevices = yield call(cloneDevicesService, payload);
        yield put({
            type: types.CLONE_DEVICES_SUCCESS,
            response: isClonedDevices,
        });
        if (isClonedDevices) {
            const getDevicesInBlaListData = yield call(
                getDevicesInBlaListService,
                payload
            );
            yield put({
                type: types.GET_DEVICES_BLA_LIST_SUCCESS,
                response: getDevicesInBlaListData,
            });
        }
    } catch (error: any) {}
}

export function* deviceSaga(): any {
    yield all([takeLatest(ADD_DEVICE, addDeviceSaga)]);
    yield all([takeLatest(types.GET_DEVICE_LIST, getDevicesListSaga)]);
    yield all([takeEvery(types.GET_ALL_DEVICES_LIST, getAllDevicesListSaga)]);
    yield all([takeLatest(types.GET_DEVICE_DETAILS, getDeviceDetailsSaga)]);
    yield all([takeLatest(types.EDIT_DEVICE, editDeviceSaga)]);
    yield all([takeEvery(types.EDIT_DEVICE_SUCCESS, getDevicesListSaga)]);
    yield all([takeEvery(types.SET_DEVICE_START, deviceStartSaga)]);
    yield all([takeEvery(types.SET_DEVICE_STOP, deviceStopSaga)]);
    yield all([
        takeLatest(
            types.ACTIVATE_DEACTIVATE_DEVICES,
            activateDeactivateDevicesSaga
        ),
    ]);
    yield all([takeLatest(types.CLONE_DEVICES, cloneDevicesSaga)]);
}
