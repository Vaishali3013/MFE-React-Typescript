import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    assignTimeCapsuleService,
    createTimeCapsuleService,
    getTimeCapsuleByIdService,
    getTimeCapsuleListsService,
    statusUpdateTimeCapsuleService,
    updateTimeCapsuleService,
} from 'redux/services/ConfigureServices/timeCapsuleService';
import * as types from 'redux/types/configureTypes';

export function* getTimeCapsuleListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getTimeCapsuleListData = yield call(
            getTimeCapsuleListsService,
            payload
        );
        yield put({
            type: types.GET_TIME_CAPSULE_LIST_SUCCESS,
            response: getTimeCapsuleListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_TIME_CAPSULE_LIST_FAILURE });
    }
}

export function* getTimeCapsuleDetailsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getTimeCapsuleDetails = yield call(
            getTimeCapsuleByIdService,
            payload
        );
        yield put({
            type: types.GET_TIME_CAPSULE_DETAIL_SUCCESS,
            response: getTimeCapsuleDetails,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_TIME_CAPSULE_DETAIL_FAILURE });
    }
}

export function* createTimeCapsuleSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const setTimeCapsuleDetails = yield call(
            createTimeCapsuleService,
            payload
        );
        yield put({
            type: types.CREATE_TIME_CAPSULE_SUCCESS,
            response: setTimeCapsuleDetails,
        });
    } catch (error: any) {}
}

export function* statusUpdateTimeCapsuleSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const paginatedPayload = {
            ...payload?.paginatedPayload,
            search: payload?.searchPayload,
        };
        const timeCapsuleStatus = yield call(
            statusUpdateTimeCapsuleService,
            payload?.updatedPayload
        );
        yield put({
            type: types.STATUS_UPDATE_TIME_CAPSULE_SUCCESS,
            response: timeCapsuleStatus,
        });
        if (timeCapsuleStatus) {
            const getTimeCapsuleListData = yield call(
                getTimeCapsuleListsService,
                paginatedPayload
            );
            yield put({
                type: types.GET_TIME_CAPSULE_LIST_SUCCESS,
                response: getTimeCapsuleListData,
            });
        }
    } catch (error) {}
}

export function* updateTimeCapsuleSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const setTimeCapsuleDetails = yield call(
            updateTimeCapsuleService,
            payload
        );
        yield put({
            type: types.UPDATE_TIME_CAPSULE_SUCCESS,
            response: setTimeCapsuleDetails,
        });
    } catch (error: any) {}
}

export function* assignTimeCapsuleSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const assignTimeCapsule = yield call(assignTimeCapsuleService, payload);
        yield put({
            type: types.ASSIGN_TIME_CAPSULE_SUCCESS,
            response: assignTimeCapsule,
        });
    } catch (error: any) {}
}

export function* timeCapsuleSaga(): any {
    yield all([
        takeLatest(types.GET_TIME_CAPSULE_LIST, getTimeCapsuleListSaga),
        takeLatest(types.CREATE_TIME_CAPSULE, createTimeCapsuleSaga),
        takeLatest(types.GET_TIME_CAPSULE_DETAILS, getTimeCapsuleDetailsSaga),
        takeLatest(types.UPDATE_TIME_CAPSULE, updateTimeCapsuleSaga),
        takeLatest(types.ASSIGN_TIME_CAPSULE, assignTimeCapsuleSaga),
        takeLatest(
            types.STATUS_UPDATE_TIME_CAPSULE,
            statusUpdateTimeCapsuleSaga
        ),
    ]);
}
